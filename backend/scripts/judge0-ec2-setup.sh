#!/bin/bash
# Judge0 EC2 Setup Script
# Use this as EC2 User Data when launching the instance

set -e

# Update system
yum update -y

# Install Docker
amazon-linux-extras install docker -y
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create Judge0 directory
mkdir -p /opt/judge0
cd /opt/judge0

# Create docker-compose.yml for Judge0
cat > docker-compose.yml << 'EOF'
x-logging: &default-logging
  logging:
    driver: json-file
    options:
      max-size: "10m"
      max-file: "3"

services:
  judge0-server:
    image: judge0/judge0:1.13.1
    <<: *default-logging
    ports:
      - "2358:2358"
    privileged: true
    environment:
      - REDIS_HOST=judge0-redis
      - REDIS_PORT=6379
      - POSTGRES_HOST=judge0-db
      - POSTGRES_PORT=5432
      - POSTGRES_DB=judge0
      - POSTGRES_USER=judge0
      - POSTGRES_PASSWORD=judge0password
      - RAILS_MAX_THREADS=5
      - RAILS_ENV=production
      - ENABLE_WAIT_RESULT=true
      - CPU_TIME_LIMIT=5
      - CPU_EXTRA_TIME=1
      - WALL_TIME_LIMIT=10
      - MEMORY_LIMIT=128000
      - STACK_LIMIT=64000
      - MAX_PROCESSES_AND_OR_THREADS=30
      - MAX_FILE_SIZE=1024
    depends_on:
      judge0-db:
        condition: service_healthy
      judge0-redis:
        condition: service_healthy
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:2358/system_info"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 30s

  judge0-workers:
    image: judge0/judge0:1.13.1
    <<: *default-logging
    command: ["./scripts/workers"]
    privileged: true
    environment:
      - REDIS_HOST=judge0-redis
      - REDIS_PORT=6379
      - POSTGRES_HOST=judge0-db
      - POSTGRES_PORT=5432
      - POSTGRES_DB=judge0
      - POSTGRES_USER=judge0
      - POSTGRES_PASSWORD=judge0password
      - RAILS_ENV=production
      - INTERVAL=0.1
      - COUNT=1
    depends_on:
      judge0-server:
        condition: service_healthy
    restart: unless-stopped

  judge0-db:
    image: postgres:15-alpine
    <<: *default-logging
    environment:
      - POSTGRES_DB=judge0
      - POSTGRES_USER=judge0
      - POSTGRES_PASSWORD=judge0password
    volumes:
      - judge0-postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U judge0 -d judge0"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  judge0-redis:
    image: redis:7-alpine
    <<: *default-logging
    command: redis-server --appendonly yes
    volumes:
      - judge0-redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  judge0-postgres-data:
  judge0-redis-data:
EOF

# Start Judge0
docker-compose up -d

# Create a simple status check script
cat > /opt/judge0/status.sh << 'STATUSEOF'
#!/bin/bash
echo "=== Judge0 Status ==="
docker-compose ps
echo ""
echo "=== Health Check ==="
curl -s http://localhost:2358/system_info | head -c 200
echo ""
STATUSEOF
chmod +x /opt/judge0/status.sh

echo "Judge0 setup complete!"
