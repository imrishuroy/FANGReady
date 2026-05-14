# FANGReady

A comprehensive DSA (Data Structures & Algorithms) interview preparation platform designed to help developers master coding patterns and ace FAANG interviews.

**Live Demo:** [faangready-sigma.vercel.app](https://faangready-sigma.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)
![Go](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat-square&logo=go)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![CockroachDB](https://img.shields.io/badge/CockroachDB-Distributed_SQL-6933FF?style=flat-square)
![Judge0](https://img.shields.io/badge/Judge0-Code_Execution-green?style=flat-square)

## Features

- **150+ Curated DSA Problems** - Hand-picked questions frequently asked at Google, Amazon, Meta, Apple, Microsoft, and Netflix
- **20+ Pattern Categories** - Problems organized by pattern (Two Pointers, Sliding Window, BFS/DFS, Dynamic Programming, etc.)
- **57 Interactive Visualizers** - Step-by-step algorithm animations to build intuition
- **Online Code Execution** - Write, run, and test code in 10+ languages with Judge0 integration
- **Pattern-Based Learning** - Code templates, key insights, and common mistakes for each pattern
- **Educational Articles** - In-depth tutorials on recursion, algorithm paradigms, and more
- **Progress Tracking** - Track solved problems and monitor your preparation journey
- **Company Frequency Tags** - Know which companies ask which questions most often

## Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                       FANGReady Platform                           │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─────────────────┐              ┌──────────────────────────┐     │
│  │    Frontend     │    HTTP      │       Go Backend         │     │
│  │    (Next.js)    │   ◄────►     │         (Gin)            │     │
│  │                 │     API      │                          │     │
│  │ • Monaco Editor │              │ • RESTful API (/api/v1)  │     │
│  │ • 57 Visualizers│              │ • JWT Authentication     │     │
│  │ • Patterns UI   │              │ • Rate Limiting          │     │
│  │ • Articles      │              │ • Request Validation     │     │
│  └─────────────────┘              └────────────┬─────────────┘     │
│                                                │                   │
│                                                │                   │
│  ┌──────────────────────┐     ┌────────────────▼───────────────┐   │
│  │     CockroachDB      │     │   Judge0 (Code Execution)      │   │
│  │                      │     │                                │   │
│  │ • Users & Auth       │     │ • Secure Sandbox Execution     │   │
│  │ • Patterns/Problems  │     │ • 10+ Programming Languages    │   │
│  │ • Submissions        │     │ • Resource Limits (CPU/Mem)    │   │
│  │ • Test Cases         │     │ • PostgreSQL + Redis Workers   │   │
│  └──────────────────────┘     └────────────────────────────────┘   │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## Code Execution Architecture (Judge0)

FANGReady uses Judge0 for secure, sandboxed code execution. Here's the detailed flow:

```
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
                                 │           │  • Jobs table   │◄─────────┘       │
                                 │           │  • Results      │  (fetch result)  │
                                 │           └────────┬────────┘                  │
                                 │                    │                           │
                                 │           ┌────────▼────────┐                  │
                                 │           │      Redis      │                  │
                                 │           │  • Job Queue    │                  │
                                 │           │  • Pub/Sub      │                  │
                                 │           └────────┬────────┘                  │
                                 │                    │                           │
                                 │           ┌────────▼────────┐                  │
                                 │           │  Judge0 Workers │                  │
                                 │           │  ┌───────────┐  │                  │
                                 │           │  │  Isolate  │  │ (Linux sandbox)  │
                                 │           │  │  Sandbox  │  │                  │
                                 │           │  └───────────┘  │                  │
                                 │           └─────────────────┘                  │
                                 └────────────────────────────────────────────────┘
```

### Code Execution Flow

| Step | Component | Action |
|------|-----------|--------|
| 1 | Frontend | User writes code in Monaco Editor and clicks "Run" or "Submit" |
| 2 | Backend Handler | Receives POST request at `/api/v1/submissions` or `/api/v1/submissions/run` |
| 3 | Submission Service | Fetches problem test cases from CockroachDB |
| 4 | Submission Service | Wraps user code with language template (main function, I/O handling) |
| 5 | Judge Service | Sends batch request to Judge0: `POST /submissions/batch?base64_encoded=true` |
| 6 | Judge0 Server | Stores job metadata in PostgreSQL |
| 7 | Judge0 Server | Enqueues job token to Redis queue |
| 8 | Judge0 Workers | Polls Redis, picks up jobs from queue |
| 9 | Isolate Sandbox | Executes code in isolated Linux container with strict resource limits |
| 10 | Judge0 Workers | Writes execution results (stdout, stderr, status) back to PostgreSQL |
| 11 | Judge Service | Polls `GET /submissions/:token` until status is final |
| 12 | Submission Service | Compares actual output with expected output, determines pass/fail |
| 13 | Backend | Saves submission result to CockroachDB and returns response to frontend |

### Sequence Diagram

```
┌────────┐     ┌─────────┐     ┌──────────────┐     ┌────────────┐     ┌──────────┐
│Frontend│     │ Backend │     │Judge Service │     │Judge0 API  │     │ Workers  │
└───┬────┘     └────┬────┘     └──────┬───────┘     └─────┬──────┘     └────┬─────┘
    │               │                 │                   │                 │
    │ POST /submit  │                 │                   │                 │
    │──────────────►│                 │                   │                 │
    │               │ SubmitBatch()   │                   │                 │
    │               │────────────────►│                   │                 │
    │               │                 │ POST /submissions │                 │
    │               │                 │──────────────────►│                 │
    │               │                 │    tokens[]       │  enqueue job    │
    │               │                 │◄──────────────────│────────────────►│
    │               │                 │                   │    execute      │
    │               │                 │                   │    in sandbox   │
    │               │                 │                   │◄────────────────│
    │               │                 │ GET /submissions  │                 │
    │               │                 │──────────────────►│                 │
    │               │                 │    results[]      │                 │
    │               │                 │◄──────────────────│                 │
    │               │   results       │                   │                 │
    │               │◄────────────────│                   │                 │
    │   response    │                 │                   │                 │
    │◄──────────────│                 │                   │                 │
```

### Why Judge0 Needs PostgreSQL & Redis

| Component | Purpose |
|-----------|---------|
| **PostgreSQL** | Persistent storage for submission jobs, execution results, and language configurations |
| **Redis** | Fast in-memory job queue for worker coordination and horizontal scaling |
| **Isolate** | Linux sandboxing tool that safely executes untrusted code with strict resource limits |

### Docker Compose Services

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| `judge0-server` | judge0/judge0:1.13.1 | 2358 | REST API server |
| `judge0-workers` | judge0/judge0:1.13.1 | - | Background job processors |
| `judge0-db` | postgres:15-alpine | 5432 | Job storage |
| `judge0-redis` | redis:7-alpine | 6379 | Job queue |

### Key Backend Components

**Judge Service** (`internal/services/judge_service.go`)
```go
type JudgeService struct {
    cfg        *config.Judge0Config
    httpClient *http.Client
}

// Methods: Submit(), SubmitBatch(), GetResult(), GetBatchResults(), 
//          WaitForResult(), WaitForBatchResults()
```

**Submission Service** (`internal/services/submission_service.go`)
```go
type SubmissionService struct {
    submissionRepo *repository.SubmissionRepository
    problemRepo    *repository.ProblemRepository
    judgeService   *JudgeService
}

// Methods: Submit() - full submission, RunCode() - quick run with samples
```

### Security Considerations

1. **Code Isolation** - All user code runs inside Isolate sandbox containers
2. **Resource Limits** - Strict CPU, memory, and time limits prevent abuse
3. **Network Isolation** - Sandboxed code has no network access
4. **Base64 Encoding** - All code/input/output is base64 encoded in transit
5. **Authentication** - Backend uses JWT auth; Judge0 can use API keys

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16 | React framework with App Router |
| React | 19 | UI library |
| Tailwind CSS | 4 | Utility-first styling |
| Monaco Editor | 4.7 | VS Code-powered code editor |
| Framer Motion | 12 | Animations |
| React Markdown | 10 | Article rendering |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Go | 1.22+ | Backend language |
| Gin | 1.10 | HTTP web framework |
| CockroachDB | - | Distributed SQL database |
| pgx | 5.6 | PostgreSQL driver |
| zerolog | 1.33 | Structured logging |
| JWT | 5.3 | Authentication tokens |

### Code Execution
| Component | Purpose |
|-----------|---------|
| Judge0 Server | REST API for code submission |
| Judge0 Workers | Background job processors |
| PostgreSQL | Job metadata storage |
| Redis | Job queue coordination |
| Isolate Sandbox | Secure code execution |

## Project Structure

```
FANGReady/
├── frontend/                    # Next.js 16 application
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── articles/        # Educational content
│   │   │   ├── patterns/        # Pattern detail pages
│   │   │   ├── problems/        # Coding problems
│   │   │   └── page.tsx         # Dashboard
│   │   ├── components/
│   │   │   ├── visualizers/     # 57 algorithm visualizers
│   │   │   ├── patterns/        # Pattern UI components
│   │   │   └── ui/              # Shared UI components
│   │   ├── content/
│   │   │   └── articles/        # Article content & tutorials
│   │   ├── contexts/            # React contexts (Auth, Theme)
│   │   ├── lib/                 # Utilities & questions data
│   │   └── types/               # TypeScript definitions
│   └── public/                  # Static assets
│
├── backend/                     # Go API server
│   ├── cmd/server/              # Application entry point
│   ├── internal/
│   │   ├── config/              # Configuration management
│   │   ├── handlers/            # HTTP request handlers
│   │   ├── middleware/          # Auth, rate limiting, CORS
│   │   ├── models/              # Data models & DTOs
│   │   ├── repository/          # Database layer
│   │   └── services/            # Business logic (Judge, Submission)
│   ├── migrations/              # SQL migrations
│   ├── scripts/seed/            # Database seeding
│   ├── docker-compose.yml       # App services
│   └── docker-compose.judge0.yml # Code execution services
│
├── docs/                        # Architecture documentation
└── public/data/                 # Question datasets
```

## Getting Started

### Prerequisites

- Node.js 20+
- Go 1.22+
- Docker & Docker Compose
- CockroachDB account (or local instance)

### 1. Clone the Repository

```bash
git clone https://github.com/imrishuroy/FANGReady.git
cd FANGReady
```

### 2. Backend Setup

```bash
cd backend

# Copy environment file
cp .env.example .env
# Edit .env with your database credentials

# Download CockroachDB certificate
make cockroach-cert

# Run database migrations
export DATABASE_URL="postgresql://user:pass@host:26257/faangready?sslmode=verify-full&sslrootcert=$HOME/.postgresql/root.crt"
make migrate-up

# Seed initial data
make seed

# Start the backend server
make run-dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8080

# Start development server
npm run dev
```

### 4. Judge0 Setup (Optional - for code execution)

```bash
cd backend

# Start Judge0 services (requires Linux or Docker with privileged mode)
docker-compose -f docker-compose.judge0.yml up -d

# Verify Judge0 is running
curl http://localhost:2358/system_info
```

> **Note**: Judge0 requires Linux for full functionality. On macOS/Windows, set `JUDGE0_MOCK_MODE=true` in `.env` for development without code execution.

## API Endpoints

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Full health check |
| GET | `/health/live` | Kubernetes liveness probe |
| GET | `/health/ready` | Kubernetes readiness probe |

### Patterns
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/patterns` | List all DSA patterns |
| GET | `/api/v1/patterns/:id` | Get pattern by ID |
| GET | `/api/v1/patterns/search?q=` | Search patterns |
| GET | `/api/v1/patterns/categories` | Get all categories |

### Problems
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/problems` | List coding problems |
| GET | `/api/v1/problems/:slug` | Get problem with test cases |

### Code Execution
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/submissions/run` | Run code against sample tests |
| POST | `/api/v1/submissions` | Submit code for full evaluation |
| GET | `/api/v1/submissions/:id` | Get submission result |

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Create account |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/refresh` | Refresh access token |

## Algorithm Visualizers

FANGReady includes **57 interactive visualizers** to help understand algorithms:

| Category | Visualizers |
|----------|-------------|
| **Arrays** | Two Sum, Binary Search, Kadane's Algorithm, Prefix Sum |
| **Two Pointers** | Container With Water, 3Sum, Remove Duplicates |
| **Sliding Window** | Fixed Window, Longest Substring, Find Anagrams |
| **Linked Lists** | Reversal, Cycle Detection, Merge K Lists, Reorder List |
| **Trees** | BFS Level Order, BST Validation, Tree Traversals |
| **Graphs** | BFS Grid, DFS, Dijkstra, Topological Sort, Union Find |
| **Dynamic Programming** | Knapsack, Jump Game, DP Tables, Recurrence Builder |
| **Stacks** | Valid Parentheses, Next Greater Element, Largest Rectangle |
| **Heaps** | Kth Largest, Median Finder, Meeting Rooms |
| **Intervals** | Merge Intervals, Intersection, Meeting Rooms II |
| **Backtracking** | Permutations, Subsets, N-Queens |
| **Tries** | Insert, Search, Prefix Matching |

## Supported Languages

| Language | Judge0 ID | Version |
|----------|-----------|---------|
| Python | 71 | 3.8.1 |
| JavaScript | 63 | Node.js 12.14.0 |
| Java | 62 | OpenJDK 13.0.1 |
| C++ | 54 | GCC 9.2.0 |
| Go | 60 | 1.13.5 |
| Ruby | 72 | 2.7.0 |
| Kotlin | 78 | 1.3.70 |
| Rust | 73 | 1.40.0 |
| C# | 51 | Mono 6.6.0 |
| PHP | 68 | 7.4.1 |

## Resource Limits (Code Execution)

| Resource | Limit |
|----------|-------|
| CPU Time | 5 seconds |
| Wall Time | 10 seconds |
| Memory | 128 MB |
| Stack | 64 MB |
| Max Processes | 60 |
| Max Output | 1 MB |

## Development

### Backend Commands

```bash
make run-dev      # Start in development mode
make test         # Run tests
make lint         # Run linter
make build        # Build binary
make docker-build # Build Docker image
```

### Frontend Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # Run ESLint
npm run start     # Start production server
```

## Deployment

### Frontend
- **Vercel** - Currently deployed at [faangready-sigma.vercel.app](https://faangready-sigma.vercel.app)
- Supports automatic deployments from GitHub

### Backend
- **Railway** (configured via `railway.json`)
- Docker on any cloud provider
- Kubernetes with included health probes

### Judge0
- Self-hosted on EC2/GCE (requires privileged Docker)
- RapidAPI hosted Judge0 CE (no infrastructure)

## Documentation

- [Backend API Reference](backend/README.md) - Complete API documentation with all endpoints

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [LeetCode](https://leetcode.com) - Problem inspiration
- [Judge0](https://judge0.com) - Code execution engine
- [NeetCode](https://neetcode.io) - Pattern categorization inspiration
