# API Testing Guide

## Postman Collection

Vous pouvez utiliser cette collection Postman pour tester tous les endpoints.

### Variables Postman à définir

- `base_url`: http://localhost:8080/api
- `token`: Récupéré après login
- `user_id`: Récupéré après inscription

## Test Flow Recommandé

### 1. Register (POST /auth/register)

```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "password": "Test@1234",
  "phone": "+21650000000",
  "address": "Tunis",
  "city": "Tunis",
  "governorate": "Tunis",
  "postalCode": "1000"
}
```

### 2. Verify Email (POST /auth/verify-email)

- Récupérez le token de l'email
- POST à `/auth/verify-email?token=TOKEN`

### 3. Login (POST /auth/login)

```json
{
  "email": "test@example.com",
  "password": "Test@1234"
}
```

- Sauvegardez le token reçu

### 4. Test Health Endpoints

- POST `/health/reports/submit`
- GET `/health/reports`
- GET `/health/stats`
- GET `/health/trends`
- GET `/health/alerts`

### 5. Test User Endpoints

- GET `/users/profile`
- PUT `/users/profile`
- GET `/users/notifications`

## cURL Examples

### Register

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"Test",
    "lastName":"User",
    "email":"test@example.com",
    "password":"Test@1234",
    "phone":"+21650000000",
    "address":"Tunis",
    "city":"Tunis",
    "governorate":"Tunis",
    "postalCode":"1000"
  }'
```

### Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"Test@1234"
  }'
```

### Submit Report (with token)

```bash
curl -X POST http://localhost:8080/api/health/reports/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms":"Fever, Cough",
    "symptomList":["Fever","Cough"],
    "description":"High fever",
    "severity":"MILD",
    "location":"Tunis",
    "latitude":"36.8",
    "longitude":"10.2",
    "governorate":"Tunis",
    "anonymous":false
  }'
```

### Get Stats

```bash
curl -X GET http://localhost:8080/api/health/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Common Issues

### MongoDB Connection Error

- Vérifiez votre URI MongoDB Atlas
- Assurez-vous que votre IP est whitelisted
- Vérifiez vos credentials

### JWT Token Error

- Assurez-vous que le token commence par "Bearer "
- Le token est peut-être expiré (24h par défaut)

### Email Verification

- Configurez Gmail SMTP
- Activez les "App Passwords" dans Gmail
- Utilisez un token du lien d'email

## Frontend Integration

### Save Token

```javascript
// Après login
localStorage.setItem("token", response.data.token);
localStorage.setItem("userId", response.data.userId);
```

### Use Token in Requests

```javascript
// Dans les headers
Authorization: `Bearer ${localStorage.getItem("token")}`;
```

### Example Angular Service

```typescript
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ApiService {
  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem("token");
  }

  getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  submitReport(data: any) {
    return this.http.post(`${this.baseUrl}/health/reports/submit`, data, {
      headers: this.getHeaders(),
    });
  }
}
```
