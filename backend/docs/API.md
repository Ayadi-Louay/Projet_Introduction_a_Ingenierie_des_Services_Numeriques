# Salemty-TN API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Auth Endpoints

### Register User
**POST** `/auth/register`

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "phone": "+21612345678",
  "password": "password123",
  "newsletter": true
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "isVerified": false
  }
}
```

### Login User
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "isVerified": true
  }
}
```

### Verify Email
**GET** `/auth/verify/:token`

**Response (200):**
```json
{
  "success": true,
  "message": "Email vérifié avec succès"
}
```

### Forgot Password
**POST** `/auth/forgot-password`

**Body:**
```json
{
  "email": "john@example.com"
}
```

### Reset Password
**POST** `/auth/reset-password/:token`

**Body:**
```json
{
  "password": "newpassword123"
}
```

### Get Current User
**GET** `/auth/me` (Protected)

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "isVerified": true
  }
}
```

## Health Endpoints

### Submit Health Report
**POST** `/health/reports` (Protected)

**Body:**
```json
{
  "disease": "grippe",
  "symptoms": ["fièvre", "toux", "fatigue"],
  "severity": "medium",
  "location": {
    "latitude": 36.8065,
    "longitude": 10.1815,
    "address": "Avenue Habib Bourguiba, Tunis",
    "city": "Tunis",
    "governorate": "Tunis"
  },
  "demographics": {
    "ageGroup": "30-49",
    "gender": "male"
  },
  "isAnonymous": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Signalement enregistré avec succès",
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "disease": "grippe",
    "symptoms": ["fièvre", "toux", "fatigue"],
    "severity": "medium",
    "isAnonymous": true,
    "createdAt": "2023-09-06T10:30:00.000Z"
  }
}
```

### Get Health Reports
**GET** `/health/reports` (Admin/Health Worker only)

**Query Parameters:**
- `disease`: Filter by disease
- `city`: Filter by city  
- `governorate`: Filter by governorate
- `severity`: Filter by severity (low, medium, high, critical)
- `verified`: Filter by verification status (true/false)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "disease": "grippe",
      "symptoms": ["fièvre", "toux"],
      "severity": "medium",
      "location": {
        "city": "Tunis",
        "governorate": "Tunis"
      },
      "isAnonymous": true,
      "createdAt": "2023-09-06T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

### Get Disease Trends
**GET** `/health/trends` (Public)

**Query Parameters:**
- `city`: Filter by city
- `governorate`: Filter by governorate  
- `disease`: Filter by disease
- `period`: Time period (7d, 30d, 90d) - default: 7d

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "disease": "grippe",
      "city": "Tunis",
      "governorate": "Tunis",
      "date": "2023-09-06T00:00:00.000Z",
      "caseCount": 45,
      "severityAvg": 2.1,
      "trendPercentage": 15.5
    }
  ]
}
```

### Get Health Statistics
**GET** `/health/stats` (Public)

**Query Parameters:**
- `city`: Filter by city
- `governorate`: Filter by governorate
- `period`: Time period (24h, 7d, 30d) - default: 24h

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalReports": 247,
    "reportsByDisease": [
      { "_id": "grippe", "count": 120 },
      { "_id": "gastro-enterite", "count": 85 },
      { "_id": "allergie", "count": 42 }
    ],
    "reportsBySeverity": [
      { "_id": "medium", "count": 150 },
      { "_id": "low", "count": 70 },
      { "_id": "high", "count": 27 }
    ],
    "reportsByLocation": [
      { "_id": "Tunis", "count": 89 },
      { "_id": "Sfax", "count": 45 },
      { "_id": "Sousse", "count": 32 }
    ],
    "period": "24h"
  }
}
```

### Get Health Alerts
**GET** `/health/alerts` (Public)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d2",
      "title": "Grippe saisonnière - Tunis",
      "description": "Augmentation significative des cas de grippe...",
      "disease": "grippe",
      "severity": "high",
      "affectedAreas": ["Tunis", "Ariana", "Manouba"],
      "startDate": "2023-09-01T00:00:00.000Z",
      "endDate": "2023-10-01T00:00:00.000Z",
      "isActive": true,
      "createdAt": "2023-09-01T08:00:00.000Z"
    }
  ]
}
```

### Create Health Alert
**POST** `/health/alerts` (Admin only)

**Body:**
```json
{
  "title": "Nouvelle alerte santé",
  "description": "Description détaillée de l'alerte...",
  "disease": "grippe",
  "severity": "medium",
  "affectedAreas": ["Tunis", "Sfax"],
  "startDate": "2023-09-06",
  "endDate": "2023-09-20"
}
```

## Error Responses

All endpoints return consistent error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Accès non autorisé - token manquant"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Accès refusé - rôle user non autorisé"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Route non trouvée"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Erreur serveur"
}
```

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Response on limit**: 429 Too Many Requests

## Data Validation

All inputs are validated using Joi schemas. Common validation rules:
- **Email**: Valid email format
- **Password**: Minimum 6 characters
- **Coordinates**: Valid latitude/longitude ranges
- **Tunisian Governorates**: Must be one of 24 governorates

## Security Features

- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt (12 rounds)
- Rate limiting on all endpoints
- CORS protection
- Helmet.js security headers
- Input sanitization and validation
