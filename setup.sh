#!/bin/bash

# SalemtyTN Setup Script
# This script sets up the entire project

echo "========================================="
echo "SalemtyTN Setup Script"
echo "========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Java 21 is installed
echo -e "${YELLOW}Checking Java 21...${NC}"
if ! command -v java &> /dev/null; then
    echo -e "${RED}Java is not installed. Please install Java 21.${NC}"
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" != "21" ]; then
    echo -e "${YELLOW}Java version: $JAVA_VERSION (Expected: 21)${NC}"
fi
echo -e "${GREEN}✓ Java found${NC}"

# Check if Maven is installed
echo -e "${YELLOW}Checking Maven...${NC}"
if ! command -v mvn &> /dev/null; then
    echo -e "${RED}Maven is not installed. Please install Maven 3.8+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Maven found${NC}"

# Check if Node.js is installed
echo -e "${YELLOW}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 18+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found${NC}"

# Check if Docker is installed (optional)
echo -e "${YELLOW}Checking Docker...${NC}"
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓ Docker found${NC}"
    DOCKER_AVAILABLE=true
else
    echo -e "${YELLOW}Docker not found (optional)${NC}"
    DOCKER_AVAILABLE=false
fi

echo ""
echo "========================================="
echo "Select Setup Option:"
echo "========================================="
echo "1. Docker Setup (Recommended)"
echo "2. Manual Setup (Backend + Frontend)"
echo "3. Backend Only"
echo "4. Frontend Only"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo -e "${YELLOW}Starting Docker setup...${NC}"
        if [ "$DOCKER_AVAILABLE" = true ]; then
            docker-compose up -d
            echo -e "${GREEN}✓ Docker Compose started${NC}"
            echo ""
            echo "Services running:"
            echo "  Backend: http://localhost:8080/api"
            echo "  Frontend: http://localhost:4200"
            echo "  MongoDB: localhost:27017"
        else
            echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
            exit 1
        fi
        ;;
    
    2)
        echo -e "${YELLOW}Starting manual setup...${NC}"
        
        # Backend setup
        echo -e "${YELLOW}Setting up Backend...${NC}"
        cd backend
        echo "Building backend with Maven..."
        mvn clean package -DskipTests
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Backend built successfully${NC}"
        else
            echo -e "${RED}Backend build failed${NC}"
            exit 1
        fi
        cd ..
        
        # Frontend setup
        echo -e "${YELLOW}Setting up Frontend...${NC}"
        cd Salemty-TN
        echo "Installing npm dependencies..."
        npm install
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
        else
            echo -e "${RED}Frontend setup failed${NC}"
            exit 1
        fi
        cd ..
        
        echo ""
        echo -e "${GREEN}✓ Setup completed${NC}"
        echo ""
        echo "To start development:"
        echo "  Terminal 1 - Backend:"
        echo "    cd backend && mvn spring-boot:run"
        echo ""
        echo "  Terminal 2 - Frontend:"
        echo "    cd Salemty-TN && ng serve --open"
        ;;
    
    3)
        echo -e "${YELLOW}Setting up Backend only...${NC}"
        cd backend
        echo "Building backend with Maven..."
        mvn clean package -DskipTests
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Backend built successfully${NC}"
            echo ""
            echo "To start backend:"
            echo "  cd backend && mvn spring-boot:run"
            echo ""
            echo "API will be available at: http://localhost:8080/api"
        else
            echo -e "${RED}Backend build failed${NC}"
            exit 1
        fi
        cd ..
        ;;
    
    4)
        echo -e "${YELLOW}Setting up Frontend only...${NC}"
        cd Salemty-TN
        echo "Installing npm dependencies..."
        npm install
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
            echo ""
            echo "To start frontend:"
            echo "  cd Salemty-TN && ng serve --open"
            echo ""
            echo "Application will be available at: http://localhost:4200"
        else
            echo -e "${RED}Frontend setup failed${NC}"
            exit 1
        fi
        cd ..
        ;;
    
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "========================================="
echo -e "${GREEN}Setup completed successfully!${NC}"
echo "========================================="
echo ""
echo "📖 For more information, see:"
echo "  - QUICKSTART.md"
echo "  - README.md"
echo "  - backend/API_DOCUMENTATION.md"
echo ""
