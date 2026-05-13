# FANGReady Architecture: Judge0 Integration

This document describes how FANGReady integrates with Judge0 for secure code execution.

## System Architecture

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                           FANGReady Architecture                               │
└────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────────────────────────────┐
│  Frontend (Next.js)  │         │              Go Backend (Gin)                │
│                      │         │                                              │
│  ┌────────────────┐  │  HTTP   │  ┌───────────┐   ┌──────────────────┐        │
│  │  Monaco Editor │──┼────────►│  │ Handlers  │──►│  Submission Svc  │        │
│  │  (Code Input)  │  │  POST   │  │           │   │                  │        │
│  └────────────────┘  │ /submit │  └───────────┘   └────────┬─────────┘        │
│                      │         │                           │                  │
└──────────────────────┘         │                  ┌────────▼─────────┐        │
                                 │                  │  Judge Service   │◄─────┐ │
                                 │                  │                  │      │ │
                                 │                  │  • Submit()      │      │ │
                                 │                  │  • GetResult()   │      │ │
                                 │                  │  • WaitForBatch()│      │ │
                                 │                  └────────┬─────────┘      │ │
                                 │                           │                │ │
                                 └───────────────────────────┼────────────────┼─┘
                                                             │                │
                                   HTTP REST API             │                │
                                 ┌───────────────────────────▼────────────────┼───┐
                                 │           Judge0 System (Docker)           │   │
                                 │                                            │   │
┌─────────────────┐              │  ┌───────────────────────────────────────┐ │   │
│   CockroachDB   │              │  │        Judge0 Server (:2358)          │ │   │
│  (App Database) │              │  │                                       │ │   │
│                 │              │  │  POST /submissions/batch ───────────┐ │ │   │
│  • Users        │              │  │  GET  /submissions/:token ◄─────────┼─┼─┘   │
│  • Problems     │              │  │                                     │ │     │
│  • Submissions  │              │  └─────────────────┬───────────────────┼─┘     │
│  • Test Cases   │              │                    │                   │       │
└─────────────────┘              │           ┌────────▼────────┐          │       │
                                 │           │   PostgreSQL    │          │       │
                                 │           │                 │          │       │
                                 │           │  • Jobs table   │◄─────────┘       │
                                 │           │  • Results      │  (fetch result)  │
                                 │           └────────┬────────┘                  │
                                 │                    │                           │
                                 │           ┌────────▼────────┐                  │
                                 │           │      Redis      │                  │
                                 │           │                 │                  │
                                 │           │  • Job Queue    │                  │
                                 │           │  • Pub/Sub      │                  │
                                 │           └────────┬────────┘                  │
                                 │                    │                           │
                                 │           ┌────────▼────────┐                  │
                                 │           │  Judge0 Workers │                  │
                                 │           │                 │                  │
                                 │           │  ┌───────────┐  │                  │
                                 │           │  │  Isolate  │  │ (Linux sandbox)  │
                                 │           │  │  Sandbox  │  │                  │
                                 │           │  └───────────┘  │                  │
                                 │           └─────────────────┘                  │
                                 │                                                │
                                 └────────────────────────────────────────────────┘
```

## Code Execution Flow (Step by Step)

| Step | Component | Action |
|------|-----------|--------|
| **1** | Frontend | User writes code in Monaco Editor and clicks "Run" or "Submit" |
| **2** | Backend Handler | Receives POST request at `/api/v1/submissions` or `/api/v1/submissions/run` |
| **3** | Submission Service | Fetches problem test cases from CockroachDB |
| **4** | Submission Service | Wraps user code with language template (main function, I/O handling) |
| **5** | Judge Service | Sends batch request to Judge0: `POST /submissions/batch?base64_encoded=true` |
| **6** | Judge0 Server | Stores job metadata in **PostgreSQL** |
| **7** | Judge0 Server | Enqueues job token to **Redis** queue |
| **8** | Judge0 Workers | Polls Redis, picks up jobs from queue |
| **9** | Isolate Sandbox | Executes code in isolated Linux container with strict resource limits |
| **10** | Judge0 Workers | Writes execution results (stdout, stderr, status) back to PostgreSQL |
| **11** | Judge Service | Polls `GET /submissions/:token` until status is final (Accepted, Wrong Answer, TLE, etc.) |
| **12** | Submission Service | Compares actual output with expected output, determines pass/fail |
| **13** | Backend | Saves submission result to CockroachDB and returns response to frontend |

## Why Judge0 Needs PostgreSQL & Redis

| Component | Purpose |
|-----------|---------|
| **PostgreSQL** | Persistent storage for submission jobs, execution results, language configurations, and system metadata |
| **Redis** | Fast in-memory job queue for worker coordination. Enables asynchronous processing and horizontal scaling of workers |
| **Isolate** | Linux sandboxing tool (used by workers) that safely executes untrusted code with strict resource limits |

## Judge0 Resource Limits (from docker-compose.judge0.yml)

| Resource | Limit | Description |
|----------|-------|-------------|
| CPU Time | 5 seconds | Maximum CPU execution time |
| Wall Time | 10 seconds | Maximum real-world time (includes I/O wait) |
| Memory | 128 MB | Maximum memory usage |
| Stack | 64 MB | Maximum stack size |
| Max Processes | 60 | Maximum concurrent processes/threads |
| Max File Size | 1 MB | Maximum output file size |

## Key Backend Components

### Judge Service (`internal/services/judge_service.go`)

Handles all communication with Judge0 API:

```go
type JudgeService struct {
    cfg        *config.Judge0Config
    httpClient *http.Client
}

// Key methods:
- Submit()           // Submit single code execution
- SubmitBatch()      // Submit multiple test cases at once
- GetResult()        // Fetch result by token
- GetBatchResults()  // Fetch multiple results
- WaitForResult()    // Poll until execution completes
- WaitForBatchResults() // Poll batch until all complete
```

### Submission Service (`internal/services/submission_service.go`)

Orchestrates the full submission flow:

```go
type SubmissionService struct {
    submissionRepo *repository.SubmissionRepository
    problemRepo    *repository.ProblemRepository
    judgeService   *JudgeService
}

// Key methods:
- Submit()    // Full submission with all test cases, saves to DB
- RunCode()   // Quick run with sample test cases only
```

## Docker Compose Services

The Judge0 system runs as 4 Docker containers:

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| `judge0-server` | judge0/judge0:1.13.1 | 2358 | REST API server |
| `judge0-workers` | judge0/judge0:1.13.1 | - | Background job processors |
| `judge0-db` | postgres:15-alpine | 5432 | Job storage |
| `judge0-redis` | redis:7-alpine | 6379 | Job queue |

## Sequence Diagram

```
┌────────┐     ┌─────────┐     ┌──────────────┐     ┌────────────┐     ┌──────────┐
│Frontend│     │ Backend │     │Judge Service │     │Judge0 API  │     │ Workers  │
└───┬────┘     └────┬────┘     └──────┬───────┘     └─────┬──────┘     └────┬─────┘
    │               │                 │                   │                 │
    │ POST /submit  │                 │                   │                 │
    │──────────────►│                 │                   │                 │
    │               │                 │                   │                 │
    │               │ SubmitBatch()   │                   │                 │
    │               │────────────────►│                   │                 │
    │               │                 │                   │                 │
    │               │                 │ POST /submissions │                 │
    │               │                 │──────────────────►│                 │
    │               │                 │                   │                 │
    │               │                 │    tokens[]       │  enqueue job    │
    │               │                 │◄──────────────────│────────────────►│
    │               │                 │                   │                 │
    │               │                 │                   │    execute      │
    │               │                 │                   │    in sandbox   │
    │               │                 │                   │◄────────────────│
    │               │                 │                   │                 │
    │               │                 │ GET /submissions  │                 │
    │               │                 │──────────────────►│                 │
    │               │                 │    (polling)      │                 │
    │               │                 │                   │                 │
    │               │                 │    results[]      │                 │
    │               │                 │◄──────────────────│                 │
    │               │                 │                   │                 │
    │               │   results       │                   │                 │
    │               │◄────────────────│                   │                 │
    │               │                 │                   │                 │
    │   response    │                 │                   │                 │
    │◄──────────────│                 │                   │                 │
    │               │                 │                   │                 │
```

## Environment Variables

### Backend Configuration (`config/config.go`)

```bash
JUDGE0_URL=http://localhost:2358      # Judge0 API endpoint
JUDGE0_API_KEY=                        # Optional: for RapidAPI hosted Judge0
JUDGE0_CPU_TIME_LIMIT=5.0             # CPU time limit in seconds
JUDGE0_WALL_TIME_LIMIT=10.0           # Wall time limit in seconds
JUDGE0_MEMORY_LIMIT=128000            # Memory limit in KB
JUDGE0_STACK_LIMIT=64000              # Stack limit in KB
JUDGE0_POLL_INTERVAL=500ms            # How often to poll for results
JUDGE0_MAX_POLL_TIME=30s              # Maximum time to wait for results
```

## Deployment Options

### Option 1: Self-hosted (Current Setup)
- Run Judge0 on EC2 with Docker Compose
- Lower latency, full control over resources
- Requires server management

### Option 2: RapidAPI Hosted
- Use Judge0 CE via RapidAPI marketplace
- No infrastructure to manage
- Pay per submission, rate limited

## Security Considerations

1. **Code Isolation**: All user code runs inside Isolate sandbox containers
2. **Resource Limits**: Strict CPU, memory, and time limits prevent abuse
3. **Network Isolation**: Sandboxed code has no network access
4. **Base64 Encoding**: All code/input/output is base64 encoded in transit
5. **Authentication**: Backend uses JWT auth; Judge0 can use API keys
