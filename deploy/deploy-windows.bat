@echo off
cls
echo ========================================
echo HumanOS - One-Click Deployment Script
echo ========================================
echo.

echo [1/5] Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed!
    echo Please install Docker Desktop first:
    echo https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)
echo OK: Docker is installed

echo.
echo [2/5] Checking Docker Compose...
docker compose version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker Compose is not available!
    pause
    exit /b 1
)
echo OK: Docker Compose is available

echo.
echo [3/5] Building and starting containers...
cd /d "%~dp0"
docker compose up -d --build

echo.
echo [4/5] Waiting for services to start...
timeout /t 10 /nobreak >nul

echo.
echo [5/5] Checking service status...
docker compose ps

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo Frontend: http://localhost
echo Backend:  http://localhost/api/health
echo.
echo Useful commands:
echo   docker compose logs -f    (View logs)
echo   docker compose down       (Stop services)
echo ========================================
pause
