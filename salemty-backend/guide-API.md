# Guide d'Utilisation de l'API Salemty Authentication

## Configuration

### 1. Variables d'Environnement
Créez un fichier `.env` dans le répertoire `salemty-backend`:

```bash
MONGODB_URI=mongodb+srv://mahdi:projetzc@salemty-cluster.skezl8m.mongodb.net/salemty_db?retryWrites=true&w=majority
SERVER_PORT=8081
JWT_SECRET=ton-super-secret-très-long-au-moins-64-caractères-change-le-!!!!!
JWT_EXPIRATION_MS=86400000
```

### 2. Démarrage du Backend

#### Avec Maven:
```bash
cd salemty-backend
mvn spring-boot:run
```

#### Ou via JAR:
```bash
mvn clean package
java -jar target/salemty-backend-0.0.1-SNAPSHOT.jar
```

## Endpoints de l'API

### 1. Inscription (Register)
**Endpoint:** `POST /api/auth/register`

**Request:**
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Mahdi",
    "lastName": "Dev",
    "email": "mahdi@mail.com",
    "phone": "+21699999999",
    "password": "123456"
  }'
```

**Response (Succès - 201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "message": "Compte créé avec succès"
}
```

**Response (Erreur - 409):**
```json
{
  "token": null,
  "message": "Email déjà utilisé"
}
```

### 2. Connexion (Login)
**Endpoint:** `POST /api/auth/login`

**Request:**
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mahdi@mail.com",
    "password": "123456"
  }'
```

**Response (Succès - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "message": "Connexion réussie"
}
```

**Response (Erreur - 401):**
```json
{
  "token": null,
  "message": "Mot de passe incorrect"
}
```

ou

```json
{
  "token": null,
  "message": "Utilisateur non trouvé"
}
```

## Validations

### Inscription (RegisterRequest)
- **firstName**: Required, non-vide
- **lastName**: Required, non-vide
- **email**: Required, format email valide
- **phone**: Required, non-vide
- **password**: Required, minimum 6 caractères

### Connexion (LoginRequest)
- **email**: Required, format email valide
- **password**: Required, non-vide

## Codes HTTP Renvoyés

| Code | Signification |
|------|---------------|
| 200 | OK - Connexion réussie |
| 201 | Created - Compte créé |
| 400 | Bad Request - Données invalides |
| 401 | Unauthorized - Authentification échouée |
| 409 | Conflict - Email déjà utilisé |
| 500 | Internal Server Error |

## Troubleshooting

### Erreur: "Connection refused"
- Assurez-vous que le backend est en cours d'exécution
- Vérifiez que le port 8081 est pas utilisé

### Erreur: "Email déjà utilisé"
- L'utilisateur existe déjà dans la base de données
- Utilisez une adresse email différente ou connectez-vous

### Erreur: "Could not connect to MongoDB"
- Vérifiez la chaîne de connexion MongoDB dans `.env`
- Assurez-vous que votre IP est whitelistée dans MongoDB Atlas
- Vérifiez les credentials MongoDB

### JWT Token invalide
- Le token a probablement expiré (24h par défaut)
- Reconnectez-vous pour obtenir un nouveau token
