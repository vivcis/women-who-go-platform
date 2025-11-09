# Multi-stage build
FROM node:18-alpine AS frontend-builder

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Backend build 
FROM golang:1.23-alpine AS backend-builder

WORKDIR /app/backend
COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ ./
RUN go build -o women-who-go-backend .

# Final image
FROM alpine:latest

# Install dependencies
RUN apk --no-cache add ca-certificates

WORKDIR /app

# Copy backend binary
COPY --from=backend-builder /app/backend/women-who-go-backend ./

# Copy frontend build
COPY --from=frontend-builder /app/frontend/out ./frontend-static

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

# Start the application
CMD ["./women-who-go-backend"]