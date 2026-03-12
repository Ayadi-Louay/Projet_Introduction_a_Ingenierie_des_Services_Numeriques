# Deployment Guide

## Production Checklist

### Pre-Deployment

- [ ] Générer une clé JWT secrète sécurisée
- [ ] Configurer les variables d'environnement
- [ ] Tester tous les endpoints en environnement de staging
- [ ] Vérifier les logs pour les erreurs
- [ ] Mettre à jour les URLs CORS
- [ ] Configurer le HTTPS/SSL

## Docker Deployment

### Dockerfile

```dockerfile
FROM openjdk:21-slim as builder
WORKDIR /app
COPY . .
RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

FROM openjdk:21-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Docker Compose

```yaml
version: "3.8"

services:
  salemty-backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATA_MONGODB_URI: ${MONGODB_URI}
      JWT_SECRET: ${JWT_SECRET}
      SPRING_MAIL_USERNAME: ${MAIL_USERNAME}
      SPRING_MAIL_PASSWORD: ${MAIL_PASSWORD}
    depends_on:
      - mongodb

  salemty-frontend:
    build: ./Salemty-TN
    ports:
      - "4200:4200"
    depends_on:
      - salemty-backend

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

## Build Production JAR

```bash
cd backend
mvn clean package -DskipTests

# JAR file will be in target/salemty-tn-0.0.1-SNAPSHOT.jar
```

## Running Production JAR

```bash
java -jar target/salemty-tn-0.0.1-SNAPSHOT.jar \
  --spring.data.mongodb.uri=mongodb+srv://user:pass@cluster.mongodb.net/db \
  --jwt.secret=your_secret_key \
  --spring.mail.username=your_email \
  --spring.mail.password=your_password
```

## Nginx Configuration (Reverse Proxy)

```nginx
server {
    listen 80;
    server_name api.salemtytn.tn;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name salemtytn.tn;

    location / {
        proxy_pass http://localhost:4200;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## SSL/TLS (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate Certificate
sudo certbot certonly --nginx -d api.salemtytn.tn -d salemtytn.tn

# Update Nginx for HTTPS
```

## Environment Variables

```bash
# .env file
MONGODB_URI=mongodb+srv://ayadilouay04_db_user:0000@salemtytn.2rx1vt1.mongodb.net/?appName=SalemtyTN
JWT_SECRET=your_very_secure_secret_key_here_change_this_in_production
SPRING_MAIL_USERNAME=your_email@gmail.com
SPRING_MAIL_PASSWORD=your_app_password
SPRING_PROFILES_ACTIVE=prod
SERVER_SERVLET_CONTEXT_PATH=/api
```

## Monitoring & Logging

### Application Logs

```yaml
# logback-spring.xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
<property name="LOG_FILE" value="/var/log/salemtytn/app.log"/>

<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
<file>${LOG_FILE}</file>
<encoder>
<pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
</encoder>
<rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
<fileNamePattern>${LOG_FILE}.%d{yyyy-MM-dd}.%i.gz</fileNamePattern>
<maxFileSize>10MB</maxFileSize>
<maxHistory>30</maxHistory>
</rollingPolicy>
</appender>

<root level="INFO">
<appender-ref ref="FILE"/>
</root>
</configuration>
```

## Database Backup

```bash
# MongoDB Atlas Backup (Automated in cloud)
# Manual backup command
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/salemtytn" --out=./backup

# Restore
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/salemtytn" ./backup
```

## Performance Optimization

1. Enable Gzip Compression in Nginx
2. Use CDN for static assets
3. Implement caching strategies
4. Monitor database query performance
5. Use connection pooling
6. Implement rate limiting

## Security Checklist

- [ ] HTTPS/SSL enabled
- [ ] CORS properly configured
- [ ] JWT tokens validated
- [ ] Password hashing strong (BCrypt)
- [ ] Input validation implemented
- [ ] SQL injection prevention (MongoDB injection)
- [ ] Rate limiting enabled
- [ ] Security headers set (HSTS, CSP, etc)
- [ ] Regular security updates
- [ ] Sensitive data not logged

## Health Check Endpoint

```java
@GetMapping("/health")
public ResponseEntity<String> health() {
    return ResponseEntity.ok("OK");
}
```

## Scaling Considerations

1. Use load balancer (Nginx, HAProxy)
2. Deploy multiple instances
3. Use MongoDB replica sets
4. Implement caching (Redis)
5. Monitor resource usage
6. Auto-scaling policies

## Troubleshooting

### Common Issues

**MongoDB Connection Error**

```
Solution: Check network access, IP whitelist, credentials
```

**JWT Token Issues**

```
Solution: Verify secret key consistency across instances
```

**High Memory Usage**

```
Solution: Monitor logs, increase JVM heap size if needed
```

**Slow Queries**

```
Solution: Add indexes in MongoDB, optimize queries
```
