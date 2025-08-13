# Build frontend
FROM oven/bun AS builder-bun
WORKDIR /app

COPY . .
RUN bun install --frozen-lockfile
RUN bun run build:client

# Build backend
FROM golang:1.25-alpine AS builder-go
WORKDIR /app

COPY --from=builder-bun /app/backend .
RUN go mod download
RUN CGO_ENABLED=0 go build -tags production -o mnlrbase

# Deploy binary
FROM alpine:latest AS runner
WORKDIR /app

COPY --from=builder-go /app/mnlrbase .
RUN chmod +x /app/mnlrbase

EXPOSE 8090

CMD ["/app/mnlrbase", "serve", "--http=0.0.0.0:8090"]