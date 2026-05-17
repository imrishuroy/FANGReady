# About

This document describes the architecture and implementation of Judge0 integration in AlgoPatterns for secure code execution. It covers the system design, execution flow, security model, and operational considerations. This is a living document and may be updated as the implementation evolves.

# Overview

AlgoPatterns is an educational platform for learning algorithm patterns. A core feature is the ability for users to write, run, and test code against predefined test cases. The primary design goals for code execution are **security**, **correctness**, and **reasonable performance**. Users should be able to execute arbitrary code without being able to harm the system, escape the sandbox, or affect other users. Execution results should be deterministic and match what would happen on a clean, standard environment.

Executing untrusted code is a notoriously difficult problem. Rather than building a custom sandbox, AlgoPatterns integrates with Judge0, an open-source online code execution system used by competitive programming platforms worldwide. Judge0 provides battle-tested isolation via Linux namespaces and cgroups (through the Isolate sandbox), supports 60+ programming languages, and handles the complexity of resource limiting, timeout enforcement, and output capture.

The integration follows a client-server model where the Go backend acts as a client to the Judge0 API. When a user submits code, the backend fetches test cases from CockroachDB, wraps the user's code with language-specific boilerplate (main function, I/O handling), and sends a batch submission to Judge0. The backend then polls for results, compares actual output with expected output, and persists the submission record.

AlgoPatterns achieves security through multiple layers:
- User code executes inside Isolate sandboxes with no network access
- Strict resource limits prevent denial-of-service attacks
- All code and I/O is base64 encoded in transit
- The Judge0 system runs in isolated Docker containers

AlgoPatterns achieves correctness:
- Each test case runs in a fresh sandbox with no state carryover
- Output comparison is exact (whitespace-sensitive by default)
- Execution uses standard language runtimes matching production environments

AlgoPatterns achieves reasonable performance:
- Batch submission reduces round-trips for problems with many test cases
- Polling with exponential backoff balances latency vs. API load
- Workers can scale horizontally to handle concurrent submissions

# Architecture

The system consists of three main components: the Next.js frontend with Monaco Editor for code input, the Go backend that orchestrates submissions, and the Judge0 system that executes code. CockroachDB stores problem definitions, test cases, and submission history.

```
┌───────────────────────────────────────────────────────────────────────────┐
│                          AlgoPatterns System                              │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────┐              ┌─────────────────────────────────┐ │
│  │ Frontend (Next.js)  │              │        Go Backend (Gin)         │ │
│  │                     │    HTTP      │                                 │ │
│  │  ┌───────────────┐  │   POST       │  ┌──────────┐  ┌─────────────┐  │ │
│  │  │ Monaco Editor │──┼─────────────▶│  │ Handlers │─▶│ Submission  │  │ │
│  │  │ (Code Input)  │  │  /submit     │  │          │  │   Service   │  │ │
│  │  └───────────────┘  │              │  └──────────┘  └──────┬──────┘  │ │
│  │                     │              │                       │         │ │
│  └─────────────────────┘              │               ┌───────▼───────┐ │ │
│                                       │               │ Judge Service │ │ │
│                                       │               │               │ │ │
│                                       │               │ • Submit()    │ │ │
│                                       │               │ • GetResult() │ │ │
│                                       │               │ • WaitBatch() │ │ │
│                                       │               └───────┬───────┘ │ │
│                                       │                       │         │ │
│                                       └───────────────────────┼─────────┘ │
│                                                               │           │
└───────────────────────────────────────────────────────────────┼───────────┘
                                                                │
                                          HTTP REST             │
                                                                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         Judge0 System (Docker)                            │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                    Judge0 Server (:2358)                            │  │
│  │                                                                     │  │
│  │    POST /submissions/batch ──────────────────────┐                  │  │
│  │    GET  /submissions/:token ◀────────────────────┼───── (polling)   │  │
│  │                                                  │                  │  │
│  └──────────────────────────┬───────────────────────┼──────────────────┘  │
│                             │                       │                     │
│            ┌────────────────▼────────────────┐      │                     │
│            │          PostgreSQL             │      │                     │
│            │                                 │      │                     │
│            │  • Submission metadata          │◀─────┘                     │
│            │  • Execution results            │   (write results)          │
│            │  • Language configurations      │                            │
│            └────────────────┬────────────────┘                            │
│                             │                                             │
│            ┌────────────────▼────────────────┐                            │
│            │            Redis                │                            │
│            │                                 │                            │
│            │  • Job queue                    │                            │
│            │  • Worker coordination          │                            │
│            └────────────────┬────────────────┘                            │
│                             │                                             │
│            ┌────────────────▼────────────────┐                            │
│            │        Judge0 Workers           │                            │
│            │                                 │                            │
│            │  ┌───────────────────────────┐  │                            │
│            │  │    Isolate Sandbox        │  │                            │
│            │  │    (Linux namespaces)     │  │                            │
│            │  └───────────────────────────┘  │                            │
│            └─────────────────────────────────┘                            │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘

┌───────────────────┐
│    CockroachDB    │
│   (App Database)  │
│                   │
│  • Users          │
│  • Problems       │
│  • Test Cases     │
│  • Submissions    │
└───────────────────┘
```

The separation between the application database (CockroachDB) and Judge0's internal database (PostgreSQL) is intentional. Judge0 is treated as a black-box service that could be replaced with a hosted alternative without changing the application schema. The Go backend is the only component that communicates with both systems.

# Code Execution Flow

When a user clicks "Run" or "Submit" in the Monaco Editor, the frontend sends a POST request to the backend with the user's code, selected language, and problem identifier. The backend then orchestrates a multi-step execution flow that involves both the application database and the Judge0 system.

The submission handler first validates the request and authenticates the user. For authenticated submissions, the user ID is recorded; for anonymous "Run" operations, submissions are ephemeral and not persisted. The handler delegates to the Submission Service, which fetches the problem definition and associated test cases from CockroachDB.

Each problem has multiple test cases, each consisting of an input string and expected output string. The Submission Service wraps the user's raw code with a language-specific template that handles reading input from stdin and writing output to stdout. This wrapping is necessary because users write solution functions, not complete programs. For example, a Java solution might be wrapped with:

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Read input
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        
        // Call user's solution
        Solution sol = new Solution();
        int result = sol.solve(arr);
        
        // Output result
        System.out.println(result);
    }
}

// User's code inserted here
class Solution {
    // ... user's code ...
}
```

The wrapped code for all test cases is then sent to the Judge Service, which constructs a batch request to Judge0. Batch submission is significantly more efficient than individual submissions when a problem has many test cases, as it reduces HTTP round-trips and allows Judge0 to parallelize execution across workers.

The Judge0 server receives the batch request, stores submission metadata in PostgreSQL, and enqueues execution jobs to Redis. Judge0 workers continuously poll Redis for jobs. When a worker picks up a job, it spins up an Isolate sandbox—a lightweight Linux container using namespaces and cgroups for isolation—compiles the code (if necessary), executes it with the provided input, and captures stdout, stderr, and resource usage. The worker writes results back to PostgreSQL and marks the job as complete.

Meanwhile, the Judge Service polls `GET /submissions/:token` for each submission in the batch. The polling interval starts at 500ms and uses exponential backoff up to a maximum poll time of 30 seconds. Once all submissions in the batch have reached a terminal status (Accepted, Wrong Answer, Time Limit Exceeded, Runtime Error, etc.), the Judge Service returns the results to the Submission Service.

The Submission Service compares actual output with expected output for each test case. Comparison is exact by default, though trailing whitespace is trimmed. A test case passes if and only if the trimmed actual output exactly matches the trimmed expected output. The overall submission status is determined by the first failing test case, or "Accepted" if all pass.

Finally, for authenticated submissions, the Submission Service persists the result to CockroachDB, including the status, runtime, memory usage, and which test cases passed or failed. The response is returned to the frontend, which displays the results to the user.

# Judge0 System Components

Judge0 is a self-contained system that runs as four Docker containers. Understanding its internal architecture helps explain why it requires PostgreSQL and Redis in addition to the API server.

The **Judge0 Server** is a Ruby on Rails application that exposes a REST API for submitting code and retrieving results. It handles request validation, language detection, and base64 encoding/decoding. The server is stateless and can be horizontally scaled behind a load balancer, though for AlgoPatterns' current load a single instance is sufficient.

**PostgreSQL** serves as the persistent data store for Judge0. It stores submission records (source code, language, status), execution results (stdout, stderr, exit code, time, memory), and system configuration (language definitions, resource limits). When a submission is created, a record is inserted into PostgreSQL before the job is enqueued. When execution completes, the worker updates this record with the results.

**Redis** provides the job queue that decouples submission from execution. When the server receives a submission, it enqueues a job containing the submission token to a Redis list. Workers use `BLPOP` (blocking list pop) to efficiently wait for jobs without busy-polling. Redis also enables horizontal scaling of workers—multiple workers can consume from the same queue, with each job processed by exactly one worker.

**Judge0 Workers** are the same Docker image as the server but run in "worker mode." Each worker runs a loop: fetch a job from Redis, execute it in an Isolate sandbox, write results to PostgreSQL, repeat. The Isolate sandbox is the critical security component. It uses Linux kernel features (namespaces, cgroups, seccomp) to create an isolated execution environment where user code cannot access the filesystem (except a temporary directory), cannot access the network, cannot spawn excessive processes, and cannot consume excessive CPU or memory.

# Backend Implementation

The Go backend implements two services for code execution: `JudgeService` handles low-level communication with the Judge0 API, while `SubmissionService` implements the higher-level submission workflow.

**JudgeService** (`internal/services/judge_service.go`) encapsulates all Judge0 API interactions:

```go
type JudgeService struct {
    cfg        *config.Judge0Config
    httpClient *http.Client
}

func (s *JudgeService) SubmitBatch(submissions []Submission) ([]string, error)
func (s *JudgeService) GetResult(token string) (*Result, error)
func (s *JudgeService) GetBatchResults(tokens []string) ([]Result, error)
func (s *JudgeService) WaitForBatchResults(tokens []string) ([]Result, error)
```

The `SubmitBatch` method sends a POST request to `/submissions/batch` with base64-encoded source code and stdin for each test case. Judge0 returns an array of tokens that can be used to poll for results. The `WaitForBatchResults` method implements the polling loop with exponential backoff, returning once all submissions reach a terminal status or the maximum poll time is exceeded.

**SubmissionService** (`internal/services/submission_service.go`) orchestrates the full submission flow:

```go
type SubmissionService struct {
    submissionRepo *repository.SubmissionRepository
    problemRepo    *repository.ProblemRepository
    judgeService   *JudgeService
}

func (s *SubmissionService) Submit(ctx context.Context, req SubmitRequest) (*SubmissionResult, error)
func (s *SubmissionService) RunCode(ctx context.Context, req RunRequest) (*RunResult, error)
```

The `Submit` method handles full submissions that run against all test cases and persist results. The `RunCode` method handles quick "Run" operations that only test against sample cases and don't persist. Both methods follow the same core flow: fetch test cases, wrap code, submit to Judge0, wait for results, compare outputs.

# Resource Limits

Judge0 enforces strict resource limits to prevent abuse and ensure fair execution. These limits are configured via environment variables and apply to every execution:

| Resource | Limit | Rationale |
|----------|-------|-----------|
| CPU Time | 5 seconds | Prevents infinite loops; sufficient for O(n²) on typical inputs |
| Wall Time | 10 seconds | Accounts for I/O wait; 2x CPU time is standard |
| Memory | 128 MB | Sufficient for most algorithms; prevents memory bombs |
| Stack | 64 MB | Allows deep recursion (e.g., DFS on large graphs) |
| Max Processes | 60 | Prevents fork bombs; allows reasonable threading |
| Max File Size | 1 MB | Prevents disk filling; sufficient for any reasonable output |

These limits are deliberately conservative. A Time Limit Exceeded (TLE) verdict indicates that the user's algorithm is too slow, not that the system is too restrictive. The 5-second CPU limit is generous compared to competitive programming judges (typically 1-2 seconds) but appropriate for an educational platform where users are learning.

If a submission exceeds any limit, execution is terminated immediately and the appropriate verdict is returned (TLE for time, Memory Limit Exceeded for memory, etc.). The sandbox cleanup is automatic—no orphaned processes or files remain.

# Security Model

Security is the paramount concern when executing untrusted code. The system employs defense in depth with multiple layers of isolation.

**Sandbox Isolation**: All user code runs inside Isolate sandboxes. Isolate uses Linux namespaces to create a separate view of the system (separate PID namespace, network namespace, mount namespace, etc.) and cgroups to enforce resource limits. The sandboxed process cannot see other processes on the system, cannot access the network, and cannot access the real filesystem. It runs as an unprivileged user inside the sandbox.

**Resource Limits**: Even within the sandbox, resource limits prevent denial-of-service attacks. A malicious submission cannot consume excessive CPU (blocked by cgroup CPU limits), spawn unlimited processes (blocked by pids cgroup), allocate unlimited memory (blocked by memory cgroup), or write unlimited data (blocked by file size limits).

**Network Isolation**: The sandbox has no network access. User code cannot make HTTP requests, connect to databases, or communicate with external services. This prevents data exfiltration, cryptocurrency mining, and participation in botnets.

**Container Isolation**: The Judge0 system itself runs in Docker containers, providing an additional layer of isolation from the host system. The worker containers run with limited capabilities and no privileged access.

**Transit Security**: All code and I/O data is base64 encoded when sent to/from Judge0. This prevents injection attacks in the JSON transport layer and ensures binary data is handled correctly. The connection between the Go backend and Judge0 should use HTTPS in production, though the current development setup uses HTTP on localhost.

**No Persistence**: Each execution runs in a fresh sandbox. No state persists between executions, preventing one user's code from affecting another's. Temporary files created during execution are deleted when the sandbox terminates.

# Deployment Considerations

AlgoPatterns supports two deployment models for Judge0: self-hosted and API-hosted.

**Self-Hosted Deployment**: The current setup runs Judge0 on the same infrastructure as the application, using Docker Compose to orchestrate the four containers (server, worker, PostgreSQL, Redis). This approach offers lower latency (no external API calls), full control over resource limits, and no per-submission costs. The tradeoff is operational complexity—the team must manage container orchestration, monitor worker health, and scale capacity as usage grows. For production, the Judge0 system should run on a separate EC2 instance (or equivalent) from the application to isolate blast radius and allow independent scaling.

**API-Hosted Deployment**: Judge0 is available as a hosted service via RapidAPI. This eliminates infrastructure management but introduces per-submission costs and rate limits. The hosted option is suitable for low-volume usage or as a fallback when self-hosted infrastructure is unavailable. Switching between self-hosted and API-hosted requires only changing the `JUDGE0_URL` and `JUDGE0_API_KEY` environment variables.

For production self-hosted deployment, consider:
- Running Judge0 on dedicated instances with CPU optimized for compilation/execution
- Scaling workers horizontally based on queue depth
- Monitoring worker health and auto-restarting failed containers
- Setting up Redis persistence or clustering for job queue durability
- Configuring PostgreSQL backups (though Judge0 data is largely ephemeral)

# Future Considerations

Several enhancements are under consideration for future iterations:

**Custom Test Cases**: Allow users to add their own test cases beyond the predefined set. This would require frontend UI for input/output specification and validation that custom inputs are reasonable (not too large, properly formatted).

**Real-time Output Streaming**: Currently, users see results only after execution completes. WebSocket-based streaming could show output as it's produced, improving the experience for long-running executions.

**Execution Caching**: Identical submissions (same code, same inputs) could return cached results instead of re-executing. This would reduce load and improve latency for common cases, though cache invalidation when test cases change would need careful handling.

**Language-Specific Feedback**: Provide more helpful error messages by parsing compiler output and runtime errors. For example, translating cryptic Java stack traces into user-friendly messages pointing to the likely issue.

# References

- [Judge0 Documentation](https://github.com/judge0/judge0) - Official Judge0 repository and documentation
- [Isolate](https://github.com/ioi/isolate) - The Linux sandbox used by Judge0
- [Linux Namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html) - Kernel feature enabling process isolation
- [Cgroups](https://man7.org/linux/man-pages/man7/cgroups.7.html) - Kernel feature enabling resource limiting
