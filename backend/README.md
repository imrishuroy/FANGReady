# FANGReady Backend API

Production-ready Go backend for the FANGReady DSA patterns platform, built with Gin and CockroachDB.

## Tech Stack

- **Go 1.22+** - Modern, performant backend
- **Gin** - High-performance HTTP framework
- **CockroachDB** - Distributed SQL database
- **pgx** - PostgreSQL driver with connection pooling
- **zerolog** - Structured logging

## Features

- RESTful API with versioning (`/api/v1`)
- Request/response validation
- Rate limiting (per-IP)
- Structured JSON logging
- Graceful shutdown
- Health checks (liveness/readiness)
- CORS support
- Request ID tracking
- Connection pooling
- Database migrations

## Quick Start

### 1. Setup CockroachDB Certificate

```bash
make cockroach-cert
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your CockroachDB credentials
```

### 3. Run Migrations

```bash
export DATABASE_URL="postgresql://user:pass@host:26257/faangready?sslmode=verify-full&sslrootcert=$HOME/.postgresql/root.crt"
make migrate-up
```

### 4. Seed Database

```bash
make seed
```

### 5. Run Server

```bash
make run
# Or for development:
make run-dev
```

## API Endpoints

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Full health check |
| GET | `/health/live` | Liveness probe |
| GET | `/health/ready` | Readiness probe |

### Patterns
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/patterns` | List all patterns |
| GET | `/api/v1/patterns/:id` | Get pattern by ID |
| POST | `/api/v1/patterns` | Create pattern |
| PUT | `/api/v1/patterns/:id` | Update pattern |
| DELETE | `/api/v1/patterns/:id` | Delete pattern |
| GET | `/api/v1/patterns/categories` | Get all categories |
| GET | `/api/v1/patterns/search?q=` | Search patterns |
| GET | `/api/v1/patterns/export` | Export all patterns |
| POST | `/api/v1/patterns/bulk` | Bulk import patterns |

### Query Parameters

```
GET /api/v1/patterns?page=1&page_size=20&difficulty=Medium&category=Two&sort_by=category&sort_order=asc
```

## Project Structure

```
backend/
├── cmd/
│   └── server/          # Application entry point
├── internal/
│   ├── config/          # Configuration management
│   ├── handlers/        # HTTP handlers
│   ├── middleware/      # Request middleware
│   ├── models/          # Data models & DTOs
│   ├── repository/      # Database layer
│   └── services/        # Business logic
├── migrations/          # SQL migrations
├── pkg/
│   └── response/        # Standard API responses
├── scripts/
│   ├── seed/            # Database seeding
│   └── convert-patterns.js
├── data/
│   └── patterns.json    # Seed data
├── Dockerfile
├── docker-compose.yml
└── Makefile
```

## Configuration

Environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_HOST` | `0.0.0.0` | Server bind address |
| `SERVER_PORT` | `8080` | Server port |
| `GIN_MODE` | `release` | Gin mode (debug/release) |
| `DB_HOST` | `localhost` | CockroachDB host |
| `DB_PORT` | `26257` | CockroachDB port |
| `DB_USER` | `root` | Database user |
| `DB_PASSWORD` | | Database password |
| `DB_NAME` | `faangready` | Database name |
| `DB_SSL_MODE` | `verify-full` | SSL mode |
| `DB_SSL_ROOT_CERT` | | Path to CA certificate |
| `RATE_LIMIT_RPS` | `100` | Requests per second |
| `LOG_LEVEL` | `info` | Log level |

## Development

```bash
# Install dependencies
make deps

# Run linter
make lint

# Run tests
make test

# Build binary
make build
```

## Docker

```bash
# Build image
make docker-build

# Run container
make docker-run

# Or use docker-compose
docker-compose up -d
```

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "requestId": "uuid",
    "version": "1.0.0"
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Pattern not found",
    "details": {}
  }
}
```
