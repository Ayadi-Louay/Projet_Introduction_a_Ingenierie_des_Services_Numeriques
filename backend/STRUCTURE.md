# Salemty-TN Backend - Structure des fichiers à créer

## 📁 Arborescence complète

```
backend/
├── 📄 package.json
├── 📄 .env.example  
├── 📄 .gitignore
├── 📄 server.js
├── 📄 README.md
│
├── 📁 src/
│   ├── 📄 app.js
│   ├── 📁 config/
│   │   ├── 📄 database.js
│   │   └── 📄 jwt.js
│   ├── 📁 controllers/
│   │   ├── 📄 authController.js
│   │   ├── 📄 healthController.js
│   │   └── 📄 userController.js
│   ├── 📁 middleware/
│   │   ├── 📄 auth.js
│   │   ├── 📄 validation.js
│   │   └── 📄 errorHandler.js
│   ├── 📁 models/
│   │   ├── 📄 User.js
│   │   ├── 📄 HealthReport.js
│   │   ├── 📄 DiseaseTrend.js
│   │   ├── 📄 HealthAlert.js
│   │   └── 📄 Notification.js
│   ├── 📁 routes/
│   │   ├── 📄 index.js
│   │   ├── 📄 auth.js
│   │   ├── 📄 health.js
│   │   └── 📄 admin.js
│   ├── 📁 services/
│   │   ├── 📄 emailService.js
│   │   ├── 📄 smsService.js
│   │   └── 📄 analyticsService.js
│   ├── 📁 utils/
│   │   ├── 📄 helpers.js
│   │   ├── 📄 constants.js
│   │   └── 📄 logger.js
│   └── 📁 validators/
│       ├── 📄 authValidator.js
│       ├── 📄 healthValidator.js
│       └── 📄 userValidator.js
│
├── 📁 database/
│   ├── 📄 schema.sql
│   ├── 📄 connection.js
│   ├── 📁 migrations/
│   │   ├── 📄 001_create_users.sql
│   │   ├── 📄 002_create_health_reports.sql
│   │   ├── 📄 003_create_disease_trends.sql
│   │   └── 📄 004_create_health_alerts.sql
│   └── 📁 seeds/
│       ├── 📄 initialData.js
│       ├── 📄 users.json
│       └── 📄 alerts.json
│
├── 📁 tests/
│   ├── 📄 setup.js
│   ├── 📁 unit/
│   │   ├── 📄 auth.test.js
│   │   └── 📄 health.test.js
│   ├── 📁 integration/
│   │   ├── 📄 auth.test.js
│   │   └── 📄 health.test.js
│   └── 📁 fixtures/
│       └── 📄 testData.js
│
├── 📁 docs/
│   ├── 📄 API.md
│   ├── 📄 DEPLOYMENT.md
│   └── 📄 DATABASE.md
│
├── 📁 scripts/
│   ├── 📄 seed.js
│   ├── 📄 migrate.js
│   └── 📄 backup.js
│
└── 📁 uploads/
    ├── 📁 reports/
    ├── 📁 avatars/
    └── 📁 documents/
```

## 📋 Liste des fichiers à créer avec leur rôle

### 🔧 Configuration
- **package.json** - Dépendances npm et scripts
- **.env.example** - Variables d'environnement template
- **server.js** - Point d'entrée du serveur
- **src/app.js** - Configuration Express principale

### 🗄️ Base de données
- **database/schema.sql** - Structure SQL complète
- **database/connection.js** - Connexion DB
- **database/migrations/** - Scripts de migration
- **database/seeds/** - Données initiales

### 📊 Modèles (Mongoose/Sequelize)
- **User.js** - Utilisateurs et rôles
- **HealthReport.js** - Signalements santé
- **DiseaseTrend.js** - Tendances maladies
- **HealthAlert.js** - Alertes sanitaires
- **Notification.js** - Notifications utilisateurs

### 🎯 Contrôleurs
- **authController.js** - Login/Register/Reset
- **healthController.js** - API santé et stats
- **userController.js** - Gestion profils

### 🛣️ Routes API
- **auth.js** - Routes auth (register, login, etc.)
- **health.js** - Routes santé (reports, trends, alerts)
- **admin.js** - Routes admin (gestion, validation)

### 🔐 Middleware
- **auth.js** - JWT et permissions
- **validation.js** - Validation des inputs
- **errorHandler.js** - Gestion erreurs

### 📧 Services
- **emailService.js** - Envoi emails (vérification, alertes)
- **smsService.js** - Notifications SMS
- **analyticsService.js** - Statistiques et rapports

### 🧪 Tests
- **unit/** - Tests unitaires
- **integration/** - Tests d'intégration
- **fixtures/** - Données de test

### 📚 Documentation
- **API.md** - Documentation endpoints
- **DEPLOYMENT.md** - Guide déploiement
- **DATABASE.md** - Schéma DB détaillé

## 🚀 Technologies recommandées

- **Backend**: Node.js + Express.js
- **DB**: MongoDB (Mongoose) OU PostgreSQL (Sequelize)
- **Auth**: JWT + bcrypt
- **Validation**: Joi ou express-validator
- **Email**: nodemailer
- **Tests**: Jest + supertest
- **Documentation**: Swagger/OpenAPI

## 📋 Étapes de création

1. Créer l'arborescence des dossiers
2. Installer les dépendances npm
3. Configurer la base de données
4. Implémenter les modèles
5. Créer les contrôleurs
6. Configurer les routes
7. Ajouter middleware et validation
8. Écrire les tests
9. Documenter l'API

Cette structure vous donne une base solide et scalable pour votre backend Salemty-TN!
