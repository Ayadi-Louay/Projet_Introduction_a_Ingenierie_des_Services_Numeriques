# SalemtyTN Backend - API Documentation

## Overview

Backend API pour la plateforme de surveillance sanitaire SalemtyTN, construit avec Java 21 et Spring Boot 3.5.11.

## Technologies

- **Java**: 21
- **Spring Boot**: 3.5.11
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: SMTP (Gmail)
- **Build**: Maven

## Installation & Configuration

### Prerequisites

- Java 21 JDK
- Maven 3.8+
- MongoDB Atlas Account

### Configuration (application.properties)

```properties
# MongoDB
spring.data.mongodb.uri=mongodb+srv://ayadilouay04_db_user:0000@salemtytn.2rx1vt1.mongodb.net/?appName=SalemtyTN

# JWT
jwt.secret=your_secret_key_here
jwt.expiration=86400000

# Email (Gmail)
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

### Build

```bash
cd backend
mvn clean package
```

### Run

```bash
mvn spring-boot:run
```

L'API sera disponible sur `http://localhost:8080/api`

## API Endpoints

### Authentication (6 endpoints)

#### 1. Register - Inscription

```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+216XXXXXXXX",
  "address": "123 Rue",
  "city": "Tunis",
  "governorate": "Tunis",
  "postalCode": "1000"
}
```

#### 2. Login - Connexion

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGc...",
  "userId": "xxx",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "CITIZEN"
}
```

#### 3. Verify Email - Vérification email

```
POST /api/auth/verify-email?token=xxx
```

#### 4. Forgot Password - Mot de passe oublié

```
POST /api/auth/forgot-password?email=john@example.com
```

#### 5. Reset Password - Reset mot de passe

```
POST /api/auth/reset-password?token=xxx
Content-Type: application/json

{
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

#### 6. Get Me - Profil utilisateur

```
GET /api/auth/me
Authorization: Bearer token
```

### Health/Santé (6 endpoints)

#### 1. Submit Report - Soumettre signalement

```
POST /api/health/reports/submit
Authorization: Bearer token
Content-Type: application/json

{
  "symptoms": "Fever, Cough",
  "symptomList": ["Fever", "Cough"],
  "description": "High fever and dry cough",
  "severity": "MILD",
  "location": "Tunis Center",
  "latitude": "36.8",
  "longitude": "10.2",
  "governorate": "Tunis",
  "anonymous": false
}
```

#### 2. Get Reports - Lister signalements

```
GET /api/health/reports?status=VERIFIED&governorate=Tunis
Authorization: Bearer token
```

#### 3. Get Trends - Tendances maladies

```
GET /api/health/trends
Authorization: Bearer token
```

#### 4. Get Stats - Statistiques

```
GET /api/health/stats
Authorization: Bearer token
```

#### 5. Get Alerts - Alertes actives

```
GET /api/health/alerts
Authorization: Bearer token
```

#### 6. Create Alert - Créer alerte (Admin only)

```
POST /api/admin/alerts
Authorization: Bearer admin_token
Content-Type: application/json

{
  "title": "Grippe Saisonnière",
  "description": "Augmentation des cas",
  "disease": "Influenza",
  "severity": "HIGH",
  "affectedGovernorates": ["Tunis", "Sousse"],
  "preventionAdvice": "Vaccinez-vous"
}
```

### User (4 endpoints)

#### 1. Get Profile - Voir profil

```
GET /api/users/profile
Authorization: Bearer token
```

#### 2. Update Profile - Modifier profil

```
PUT /api/users/profile
Authorization: Bearer token
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+216XXXXXXXX",
  "address": "New Address",
  "city": "Sousse",
  "governorate": "Sousse",
  "postalCode": "4000",
  "profilePicture": "url"
}
```

#### 3. Delete Account - Supprimer compte

```
DELETE /api/users/account
Authorization: Bearer token
```

#### 4. Get Notifications - Notifications

```
GET /api/users/notifications
Authorization: Bearer token
```

### Admin (4 endpoints)

#### 1. Get Users - Gérer utilisateurs

```
GET /api/admin/users
Authorization: Bearer admin_token
```

#### 2. Validate Report - Valider signalements

```
PUT /api/admin/reports/{reportId}/validate?status=VERIFIED
Authorization: Bearer admin_token
```

#### 3. Create Alert - Créer alerte

```
POST /api/admin/alerts
Authorization: Bearer admin_token
Content-Type: application/json
```

#### 4. Generate Report - Générer rapport

```
GET /api/admin/reports/generate
Authorization: Bearer admin_token
```

## Database Schema

### Users Collection

```
{
  "_id": ObjectId,
  "firstName": String,
  "lastName": String,
  "email": String,
  "password": String (hashed),
  "phone": String,
  "address": String,
  "city": String,
  "governorate": String,
  "postalCode": String,
  "role": String (CITIZEN, ADMIN, HEALTH_OFFICIAL),
  "emailVerified": Boolean,
  "profilePicture": String,
  "createdAt": DateTime,
  "updatedAt": DateTime,
  "lastLogin": DateTime,
  "active": Boolean
}
```

### Health Reports Collection

```
{
  "_id": ObjectId,
  "userId": String,
  "symptoms": String,
  "symptomList": [String],
  "description": String,
  "severity": String (MILD, MODERATE, SEVERE),
  "location": String,
  "latitude": String,
  "longitude": String,
  "governorate": String,
  "status": String (PENDING, VERIFIED, DISMISSED),
  "reportedAt": DateTime,
  "createdAt": DateTime,
  "verifiedAt": DateTime,
  "anonymous": Boolean
}
```

### Health Alerts Collection

```
{
  "_id": ObjectId,
  "createdBy": String,
  "title": String,
  "description": String,
  "disease": String,
  "severity": String (LOW, MEDIUM, HIGH, CRITICAL),
  "affectedGovernorates": [String],
  "status": String (ACTIVE, RESOLVED, ARCHIVED),
  "startDate": DateTime,
  "endDate": DateTime,
  "createdAt": DateTime,
  "updatedAt": DateTime,
  "preventionAdvice": String
}
```

## Features

### Authentification

- ✅ Inscription avec validation email
- ✅ Connexion sécurisée avec JWT
- ✅ Vérification email par token
- ✅ Récupération mot de passe par email
- ✅ Réinitialisation sécurisée
- ✅ Profil utilisateur

### Santé

- ✅ Soumission de signalements sanitaires
- ✅ Listing des signalements
- ✅ Analyse des tendances
- ✅ Statistiques en temps réel
- ✅ Gestion des alertes
- ✅ Notifications utilisateurs

### Utilisateurs

- ✅ Gestion des profils
- ✅ Mise à jour des informations
- ✅ Suppression de compte
- ✅ Notifications

### Admin

- ✅ Gestion des utilisateurs
- ✅ Validation des signalements
- ✅ Création d'alertes
- ✅ Génération de rapports

## Security Features

- JWT Authentication
- BCrypt Password Hashing
- CORS Configuration
- Email Verification
- Password Reset Tokens
- Input Validation

## Error Handling

Tous les endpoints retournent une réponse standardisée:

```json
{
  "success": true/false,
  "message": "Description",
  "data": {},
  "error": "Error message if any"
}
```

## Next Steps

1. Configurer l'email avec Gmail
2. Générer une clé JWT secrète sécurisée
3. Configurer HTTPS en production
4. Ajouter des tests unitaires
5. Déployer sur un serveur cloud
