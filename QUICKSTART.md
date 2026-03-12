# 🚀 Quick Start Guide - SalemtyTN

## ⚡ 5 Minutes Setup

### Option 1: Docker Compose (Recommandé)

```bash
# 1. Clone/naviguer vers le projet
cd Projet_Introduction_a_Ingenierie_des_Services_Numeriques

# 2. Lancer tous les services
docker-compose up -d

# 3. Attendre 30 secondes pour que tout démarre
# Backend: http://localhost:8080/api
# Frontend: http://localhost:4200
# MongoDB: localhost:27017
```

**C'est tout!** L'application est prête à utiliser.

### Option 2: Mode Développement

#### Terminal 1 - Backend

```bash
cd backend

# Build
mvn clean package

# Run
mvn spring-boot:run
```

#### Terminal 2 - Frontend

```bash
cd Salemty-TN

# Install dependencies
npm install

# Run
ng serve --open
```

---

## 🧪 Test Immédiat

### 1. Créer un compte

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Ahmed",
    "lastName": "Ben Ali",
    "email": "ahmed@example.com",
    "password": "Test@1234",
    "phone": "+21650000000",
    "address": "Rue Main",
    "city": "Tunis",
    "governorate": "Tunis",
    "postalCode": "1000"
  }'
```

### 2. Vérifier l'email (avec token d'email)

```bash
curl -X POST http://localhost:8080/api/auth/verify-email?token=XXX
```

### 3. Se connecter

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "Test@1234"
  }'
```

**Réponse:**

```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "token": "eyJhbGc...",
    "userId": "xxx",
    "email": "ahmed@example.com",
    "firstName": "Ahmed",
    "lastName": "Ben Ali",
    "role": "CITIZEN"
  }
}
```

### 4. Soumettre un signalement

```bash
curl -X POST http://localhost:8080/api/health/reports/submit \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": "Fièvre, Toux",
    "symptomList": ["Fever", "Cough"],
    "description": "Fièvre élevée et toux sèche",
    "severity": "MILD",
    "location": "Tunis Centre",
    "latitude": "36.8",
    "longitude": "10.2",
    "governorate": "Tunis",
    "anonymous": false
  }'
```

### 5. Voir les statistiques

```bash
curl -X GET http://localhost:8080/api/health/stats \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## 📁 Structure des Dossiers Importants

```
backend/
├── pom.xml                          ← Dépendances Maven
├── src/main/resources/
│   └── application.properties       ← Configuration (⚠️ À éditer!)
└── src/main/java/com/salemty/salemty_tn/
    ├── controller/                  ← API Endpoints
    ├── service/                     ← Logique métier
    ├── model/                       ← Modèles de données
    ├── repository/                  ← Accès à la BD
    ├── dto/                         ← Objets de transfert
    ├── config/                      ← Configuration Spring
    └── SalemtyTnApplication.java    ← Point d'entrée

Salemty-TN/
├── package.json                     ← Dépendances npm
├── angular.json                     ← Config Angular
└── src/
    ├── app/
    │   ├── pages/                   ← Composants pages
    │   ├── components/              ← Composants réutilisables
    │   ├── services/                ← Services API
    │   └── app.routes.ts            ← Routes
    └── main.ts                      ← Point d'entrée
```

---

## ⚙️ Configuration Importante

### application.properties

```properties
# MongoDB - DÉJÀ CONFIGURÉ
spring.data.mongodb.uri=mongodb+srv://ayadilouay04_db_user:0000@salemtytn.2rx1vt1.mongodb.net/?appName=SalemtyTN

# JWT - À CHANGER EN PRODUCTION
jwt.secret=your_secret_key_here

# Email - À CONFIGURER
spring.mail.username=votre_email@gmail.com
spring.mail.password=votre_app_password
```

### Configurer Gmail Email

1. Allez sur https://myaccount.google.com/security
2. Activer "Authentification à deux facteurs"
3. Générer "Mot de passe d'application"
4. Utiliser ce mot de passe dans application.properties

---

## 🔑 Tokens JWT

Le token est retourné lors du login et doit être utilisé dans le header `Authorization`.

**Format:**

```
Authorization: Bearer eyJhbGc...
```

**Durée:** 24 heures (configurable)

---

## 📚 Routes Frontend (À Implémenter)

```
/                    - Accueil
/signin              - Connexion
/signup              - Inscription
/home                - Dashboard principal
/carte               - Carte des zones à risque
/signaler            - Signaler des symptômes
/previsions          - Prévisions maladies
/prevention          - Conseils prévention
/contact             - Contact
/profil              - Profil utilisateur
```

---

## 🛑 Erreurs Courantes

### ❌ "Cannot connect to MongoDB"

**Solution:** Vérifier la connexion Internet et l'URI MongoDB

### ❌ "CORS Error"

**Solution:** Les origines CORS sont configurées pour localhost:4200 et localhost:3000

### ❌ "Invalid JWT Token"

**Solution:** Le token est peut-être expiré, se reconnecter

### ❌ "Email verification failed"

**Solution:** Vérifier la configuration SMTP

---

## 📊 API Endpoints Résumé

| Méthode | Endpoint               | Auth | Description        |
| ------- | ---------------------- | ---- | ------------------ |
| POST    | /auth/register         | ❌   | Inscription        |
| POST    | /auth/login            | ❌   | Connexion          |
| POST    | /auth/verify-email     | ❌   | Vérifier email     |
| GET     | /auth/me               | ✅   | Profil             |
| POST    | /health/reports/submit | ✅   | Signaler           |
| GET     | /health/reports        | ✅   | Lister rapports    |
| GET     | /health/stats          | ✅   | Statistiques       |
| GET     | /users/profile         | ✅   | Profil utilisateur |
| PUT     | /users/profile         | ✅   | Modifier profil    |
| POST    | /admin/alerts          | ✅   | Créer alerte       |

---

## 📝 Checklist Démarrage

- [x] Java 21 installé
- [x] Maven configuré
- [x] Node.js installé
- [ ] MongoDB URI configurée
- [ ] Email SMTP configuré
- [ ] Backend compilé
- [ ] Frontend dépendances installées
- [ ] Backend lancé
- [ ] Frontend lancé
- [ ] Test de login réussi

---

## 🚀 Prochaines Étapes

1. **Intégrer le Frontend**
   - Créer les services Angular (voir FRONTEND_INTEGRATION.md)
   - Implémenter les pages
   - Tester les appels API

2. **Personnaliser**
   - Ajouter votre logo
   - Modifier les couleurs
   - Ajouter vos textes

3. **Déployer**
   - Générer build optimisé
   - Configurer HTTPS
   - Déployer sur serveur

---

## 📞 Besoin d'Aide?

- **Documentation API**: Voir [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)
- **Tests**: Voir [TESTING.md](backend/TESTING.md)
- **Intégration Frontend**: Voir [FRONTEND_INTEGRATION.md](backend/FRONTEND_INTEGRATION.md)
- **Déploiement**: Voir [DEPLOYMENT.md](backend/DEPLOYMENT.md)

---

**Bon développement! 🎉**
