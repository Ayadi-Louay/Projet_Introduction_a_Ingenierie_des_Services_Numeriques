@echo off
REM SalemtyTN Setup Script for Windows

setlocal enabledelayedexpansion

echo =========================================
echo SalemtyTN Setup Script
echo =========================================

REM Check if Java is installed
echo.
echo Checking Java 21...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed. Please install Java 21.
    pause
    exit /b 1
)
echo [OK] Java found

REM Check if Maven is installed
echo Checking Maven...
mvn --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Maven is not installed. Please install Maven 3.8+
    pause
    exit /b 1
)
echo [OK] Maven found

REM Check if Node.js is installed
echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed. Please install Node.js 18+
    pause
    exit /b 1
)
echo [OK] Node.js found

REM Check if Docker is installed (optional)
echo Checking Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Docker not found (optional)
    set DOCKER_AVAILABLE=false
) else (
    echo [OK] Docker found
    set DOCKER_AVAILABLE=true
)

echo.
echo =========================================
echo Select Setup Option:
echo =========================================
echo 1. Docker Setup (Recommended)
echo 2. Manual Setup (Backend + Frontend)
echo 3. Backend Only
echo 4. Frontend Only
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto docker_setup
if "%choice%"=="2" goto manual_setup
if "%choice%"=="3" goto backend_only
if "%choice%"=="4" goto frontend_only
echo Invalid choice
pause
exit /b 1

:docker_setup
echo Starting Docker setup...
if "%DOCKER_AVAILABLE%"=="false" (
    echo ERROR: Docker is not installed. Please install Docker first.
    pause
    exit /b 1
)
docker-compose up -d
echo [OK] Docker Compose started
echo.
echo Services running:
echo   Backend: http://localhost:8080/api
echo   Frontend: http://localhost:4200
echo   MongoDB: localhost:27017
goto end

:manual_setup
echo Starting manual setup...

REM Backend setup
echo.
echo Setting up Backend...
cd backend
echo Building backend with Maven...
call mvn clean package -DskipTests
if %errorlevel% neq 0 (
    echo ERROR: Backend build failed
    pause
    exit /b 1
)
echo [OK] Backend built successfully
cd ..

REM Frontend setup
echo.
echo Setting up Frontend...
cd Salemty-TN
echo Installing npm dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend setup failed
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
cd ..

echo.
echo [OK] Setup completed
echo.
echo To start development:
echo   Terminal 1 - Backend:
echo     cd backend
echo     mvn spring-boot:run
echo.
echo   Terminal 2 - Frontend:
echo     cd Salemty-TN
echo     ng serve --open
goto end

:backend_only
echo Setting up Backend only...
cd backend
echo Building backend with Maven...
call mvn clean package -DskipTests
if %errorlevel% neq 0 (
    echo ERROR: Backend build failed
    pause
    exit /b 1
)
echo [OK] Backend built successfully
cd ..
echo.
echo To start backend:
echo   cd backend
echo   mvn spring-boot:run
echo.
echo API will be available at: http://localhost:8080/api
goto end

:frontend_only
echo Setting up Frontend only...
cd Salemty-TN
echo Installing npm dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend setup failed
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
cd ..
echo.
echo To start frontend:
echo   cd Salemty-TN
echo   ng serve --open
echo.
echo Application will be available at: http://localhost:4200
goto end

:end
echo.
echo =========================================
echo Setup completed successfully!
echo =========================================
echo.
echo For more information, see:
echo   - QUICKSTART.md
echo   - README.md
echo   - backend/API_DOCUMENTATION.md
echo.
pause
