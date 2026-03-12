# 🔧 Troubleshooting Guide

## Common Issues & Solutions

---

## 🔴 Backend Issues

### Port Already in Use

**Error**: `Address already in use :8080`

**Solutions**:

1. Kill the process using port 8080:

   ```bash
   # Linux/Mac
   lsof -i :8080 | grep LISTEN | awk '{print $2}' | xargs kill -9

   # Windows
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   ```

2. Use different port:
   ```properties
   server.port=8081
   ```

---

### MongoDB Connection Error

**Error**: `Unable to connect to MongoDB`

**Causes & Solutions**:

1. **Wrong URI**
   - Check MongoDB Atlas connection string
   - Ensure username/password are correct
   - Verify database name

2. **IP Whitelist**
   - Go to MongoDB Atlas → Security → Network Access
   - Add your IP address
   - Or add 0.0.0.0/0 for development

3. **Credentials Wrong**

   ```properties
   # Verify format in application.properties
   spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/?appName=SalemtyTN
   ```

4. **Network Issue**
   ```bash
   # Test connectivity
   ping cluster.mongodb.net
   ```

---

### Maven Build Fails

**Error**: `BUILD FAILURE`

**Solutions**:

1. **Clear Maven Cache**

   ```bash
   mvn clean
   rm -rf ~/.m2/repository  # Linux/Mac
   del %USERPROFILE%\.m2\repository  # Windows
   ```

2. **Check Java Version**

   ```bash
   java -version
   # Should show: openjdk version "21"
   ```

3. **Check Dependencies**
   ```bash
   mvn dependency:tree
   ```

---

### JWT Token Error

**Error**: `Invalid or expired JWT token`

**Solutions**:

1. **Token Expired**
   - Tokens expire after 24 hours by default
   - Login again to get new token

2. **Invalid Format**
   - Ensure header is: `Authorization: Bearer <token>`
   - Remove extra spaces

3. **Secret Key Mismatch**
   - Check `jwt.secret` in application.properties
   - Must be consistent across restarts

---

### Email Not Sending

**Error**: `Failed to send email`

**Causes & Solutions**:

1. **Gmail Configuration**

   ```
   Not configured:
   - Enable 2FA in Gmail account
   - Generate App Password
   - Use App Password (not regular password)
   ```

2. **Check Configuration**

   ```properties
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=your_email@gmail.com
   spring.mail.password=your_app_password
   ```

3. **Test Connection**
   ```bash
   # Use telnet to test SMTP
   telnet smtp.gmail.com 587
   ```

---

### Memory Issues

**Error**: `OutOfMemoryError: Java heap space`

**Solutions**:

1. **Increase Heap Size**

   ```bash
   export MAVEN_OPTS="-Xmx1024m -Xms512m"
   mvn spring-boot:run
   ```

2. **Or in IDE**: Set VM options to `-Xmx1024m`

---

## 🟡 Frontend Issues

### Node Modules Issues

**Error**: `Module not found`

**Solutions**:

1. **Reinstall Dependencies**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Clear npm Cache**
   ```bash
   npm cache clean --force
   ```

---

### Port 4200 Already in Use

**Error**: `Port 4200 already in use`

**Solutions**:

1. **Use Different Port**

   ```bash
   ng serve --port 4300
   ```

2. **Kill Process**
   ```bash
   # Linux/Mac
   lsof -i :4200 | grep LISTEN | awk '{print $2}' | xargs kill -9
   ```

---

### CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Causes & Solutions**:

1. **Verify Backend CORS**

   ```java
   // In SecurityConfig.java
   configuration.setAllowedOrigins(Arrays.asList(
       "http://localhost:4200",
       "http://localhost:3000"
   ));
   ```

2. **Check API URL**

   ```typescript
   // In environment.ts
   apiUrl: "http://localhost:8080/api";
   ```

3. **Ensure Backend is Running**
   ```bash
   curl http://localhost:8080/api/auth/login
   ```

---

### TypeScript Errors

**Error**: `Type 'X' is not assignable to type 'Y'`

**Solutions**:

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Update Angular**
   ```bash
   ng update @angular/cli @angular/core
   ```

---

## 🔵 Docker Issues

### Docker Not Running

**Error**: `Cannot connect to Docker daemon`

**Solutions**:

1. **Start Docker**

   ```bash
   # Linux
   sudo systemctl start docker

   # Mac
   open /Applications/Docker.app

   # Windows
   Start-Service Docker  # PowerShell as admin
   ```

---

### Container Won't Start

**Error**: `Container exited with code 1`

**Solutions**:

1. **Check Logs**

   ```bash
   docker-compose logs salemty-backend
   ```

2. **Verify Network**

   ```bash
   docker network ls
   docker network inspect salemtytn_salemty-network
   ```

3. **Rebuild**
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

---

### MongoDB Connection from Container

**Error**: `Cannot connect to MongoDB`

**Solutions**:

1. **Check MongoDB Service**

   ```bash
   docker-compose logs mongodb
   docker ps | grep mongodb
   ```

2. **Verify Network**
   ```bash
   docker exec salemty-backend ping mongodb
   ```

---

## 🟢 Database Issues

### Database Empty

**Error**: No data returned from API

**Solutions**:

1. **Check MongoDB**

   ```bash
   # Connect to MongoDB Atlas
   # Check collections exist
   # Verify data is there
   ```

2. **Create Test Data**
   ```bash
   # Use MongoDB Compass or shell
   # Insert test documents
   ```

---

### Duplicate Key Error

**Error**: `E11000 duplicate key error`

**Causes**:

- Email already exists
- Duplicate unique index

**Solutions**:

1. **Use Different Email**

   ```bash
   # Register with different email address
   ```

2. **Drop Collection**
   ```bash
   # In MongoDB Atlas shell
   db.users.drop()
   ```

---

### Slow Queries

**Error**: API response is slow

**Solutions**:

1. **Check Indexes**

   ```bash
   # Ensure indexes are created
   # See MongoDBIndexConfig.java
   ```

2. **Monitor Queries**
   ```bash
   # Use MongoDB Atlas dashboard
   # Check query performance
   ```

---

## 🟠 API Issues

### 401 Unauthorized

**Error**: `Unauthorized access`

**Causes**:

- Missing token
- Invalid token
- Expired token

**Solutions**:

1. **Ensure Token in Header**

   ```
   Authorization: Bearer eyJhbGc...
   ```

2. **Get New Token**
   ```bash
   POST /auth/login
   ```

---

### 400 Bad Request

**Error**: `Bad request validation`

**Causes**:

- Missing required fields
- Invalid format
- Wrong data type

**Solutions**:

1. **Check Request Body**

   ```json
   {
     "email": "user@example.com",
     "password": "Password@1234"
   }
   ```

2. **Verify Content-Type**
   ```
   Content-Type: application/json
   ```

---

### 404 Not Found

**Error**: `Endpoint not found`

**Solutions**:

1. **Check API Path**

   ```bash
   # Correct: http://localhost:8080/api/auth/login
   # Wrong: http://localhost:8080/auth/login
   ```

2. **Verify Endpoint Exists**
   ```bash
   # Check controller for @GetMapping, @PostMapping
   ```

---

### 500 Internal Server Error

**Error**: `Internal server error`

**Solutions**:

1. **Check Backend Logs**

   ```bash
   # See error message in console
   # Look for stack trace
   ```

2. **Common Causes**:
   - Database connection error
   - NullPointerException
   - Configuration error

---

## 🆘 Emergency Fixes

### Restart Everything

```bash
# Stop all services
docker-compose down

# Remove volumes (caution: data loss!)
docker-compose down -v

# Rebuild
docker-compose up -d --build

# Check logs
docker-compose logs -f
```

---

### Reset Database

```bash
# Connect to MongoDB Atlas
# Delete all collections
# Restart application
# Create new test data
```

---

### Clear Cache

```bash
# Maven
mvn clean

# npm
npm cache clean --force

# Docker
docker system prune -a
docker volume prune
```

---

## 📊 Debugging Tools

### Backend

- **Logs**: Check console output
- **Debugger**: Use IDE debugger
- **Postman**: Test endpoints
- **cURL**: Command line testing

### Frontend

- **DevTools**: F12 in browser
- **Console**: Check errors
- **Network**: Monitor requests
- **Angular DevTools**: Chrome extension

### Database

- **MongoDB Compass**: GUI client
- **Atlas Dashboard**: Web interface
- **mongosh**: Command line shell

---

## 🔍 Logging

### Enable Debug Logging

```properties
# application.properties
logging.level.com.salemty=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.springframework.data=DEBUG
```

### View Logs

```bash
# Docker
docker-compose logs -f salemty-backend

# Maven
mvn spring-boot:run | grep ERROR
```

---

## 📞 Getting Help

1. **Check Documentation**
   - QUICKSTART.md
   - API_DOCUMENTATION.md
   - TESTING.md

2. **Search Logs**
   - Error messages are usually descriptive
   - Google the error

3. **Try Solutions**
   - Follow troubleshooting steps
   - Test incrementally

4. **Ask Community**
   - Stack Overflow
   - Spring forums
   - MongoDB forums

---

## ✅ Verification Checklist

```bash
# Java installed?
java -version

# Maven installed?
mvn --version

# Node installed?
node --version

# MongoDB accessible?
# Test connection in Atlas

# Ports available?
# 8080 (backend)
# 4200 (frontend)
# 27017 (database)

# All configs set?
# application.properties
# environment.ts
# .env file
```

---

## 🎯 Common Solutions Quick Reference

| Issue              | Solution                    |
| ------------------ | --------------------------- |
| Port in use        | Change port or kill process |
| MongoDB connection | Check URI, IP whitelist     |
| Email not sending  | Configure Gmail SMTP        |
| CORS error         | Check allowed origins       |
| Token invalid      | Login again for new token   |
| Build failure      | Clear Maven cache           |
| Slow API           | Check database indexes      |
| Docker fails       | Check logs, rebuild         |

---

**Still stuck?** Follow the error message, check the documentation, and try the solutions above!
