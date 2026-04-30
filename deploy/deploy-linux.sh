#!/bin/bash

clear
echo "========================================"
echo "心镜 MindMirror - One-Click Deployment Script"
echo "========================================"
echo ""

echo "[1/5] Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed!"
    echo "Installing Docker automatically..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    echo "Docker installed! Please relogin and run again."
    exit 1
fi
echo "OK: Docker is installed"

echo ""
echo "[2/5] Checking Docker Compose..."
if ! docker compose version &> /dev/null; then
    echo "ERROR: Docker Compose is not available!"
    exit 1
fi
echo "OK: Docker Compose is available"

echo ""
echo "[3/5] Building and starting containers..."
cd "$(dirname "$0")"
docker compose up -d --build

echo ""
echo "[4/5] Waiting for services to start..."
sleep 10

echo ""
echo "[5/5] Checking service status..."
docker compose ps

echo ""
echo "========================================"
echo "Deployment Complete!"
echo "========================================"
echo "Frontend: http://localhost"
echo "Backend:  http://localhost/api/health"
echo ""
echo "Useful commands:"
echo "  docker compose logs -f    (View logs)"
echo "  docker compose down       (Stop services)"
echo "========================================"
