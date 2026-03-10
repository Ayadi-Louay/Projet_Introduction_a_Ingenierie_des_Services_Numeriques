# 📁 Arborescence Backend Salemty-TN

```
backend/
├── 📁 src/
│   ├── 📁 controllers/
│   │   ├── 📄 authController.js
│   │   ├── 📄 healthController.js
│   │   └── 📄 userController.js
│   ├── 📁 models/
│   │   ├── 📄 User.js
│   │   ├── 📄 HealthReport.js
│   │   ├── 📄 DiseaseTrend.js
│   │   └── 📄 HealthAlert.js
│   ├── 📁 routes/
│   │   ├── 📄 auth.js
│   │   ├── 📄 health.js
│   │   └── 📄 admin.js
│   ├── 📁 middleware/
│   │   ├── 📄 auth.js
│   │   └── 📄 validation.js
│   └── 📁 services/
│       ├── 📄 emailService.js
│       └── 📄 analyticsService.js
├── 📁 database/
│   ├── 📄 schema.sql
│   └── 📁 seeds/
└── 📄 server.js
```

---

# 🎯 Fonctions Backend par Fichier

## 🔐 authController.js
- **register()** - Inscription nouvel utilisateur
- **login()** - Connexion utilisateur
- **verifyEmail()** - Vérification email
- **forgotPassword()** - Mot de passe oublié
- **resetPassword()** - Réinitialiser mot de passe
- **getMe()** - Obtenir profil utilisateur connecté

## 🏥 healthController.js
- **submitReport()** - Soumettre un signalement santé
- **getReports()** - Lister tous les signalements (admin)
- **getTrends()** - Obtenir tendances par maladie/localité
- **getStats()** - Statistiques en temps réel
- **getAlerts()** - Lister les alertes actives
- **createAlert()** - Créer une alerte (admin)

## 👤 userController.js
- **getProfile()** - Voir profil utilisateur
- **updateProfile()** - Modifier profil
- **deleteAccount()** - Supprimer compte
- **getNotifications()** - Lister notifications
- **markNotificationRead()** - Marquer notification lue

## 📊 Models (Modèles de données)

### User.js
- Gestion utilisateurs avec rôles (user/admin/health_worker)
- Hashage mots de passe
- Tokens de vérification/reset

### HealthReport.js
- Signalements de santé anonymes/authentifiés
- Géolocalisation (lat/lng, ville, gouvernorat)
- Symptômes et sévérité

### DiseaseTrend.js
- Tendances des maladies par jour/localité
- Calculs automatiques de pourcentages
- Agrégations statistiques

### HealthAlert.js
- Alertes sanitaires par région
- Niveaux de sévérité (low/medium/high/critical)
- Dates de début/fin

---

## 🛣️ Routes (Endpoints API)

### auth.js
- POST /register - Inscription
- POST /login - Connexion  
- GET /verify/:token - Vérifier email
- POST /forgot-password - Mot de passe oublié
- POST /reset-password/:token - Reset mot de passe
- GET /me - Profil utilisateur

### health.js
- POST /reports - Soumettre signalement
- GET /reports - Lister signalements (admin)
- GET /trends - Tendances maladies
- GET /stats - Statistiques globales
- GET /alerts - Alertes actives
- POST /alerts - Créer alerte (admin)

### admin.js
- GET /users - Gérer utilisateurs
- PUT /users/:id/verify - Valider utilisateur
- GET /reports/pending - Signalements en attente
- PUT /reports/:id/verify - Valider signalement

---

## 🔧 Middleware

### auth.js
- **protect()** - Vérifier JWT token
- **authorize()** - Vérifier rôles (admin/health_worker)
- **optionalAuth()** - Auth optionnelle

### validation.js
- **validateRegister()** - Valider inscription
- **validateReport()** - Valider signalement
- **validateAlert()** - Valider alerte

---

## 📧 Services

### emailService.js
- **sendVerificationEmail()** - Email de vérification
- **sendPasswordResetEmail()** - Email reset mot de passe
- **sendHealthAlert()** - Notification alerte santé

### analyticsService.js
- **calculateTrends()** - Calculer tendances
- **generateReport()** - Générer rapports
- **updateStatistics()** - Mettre à jour stats

---

## 🗄️ Base de Données

### Tables principales:
- **users** - Utilisateurs et rôles
- **health_reports** - Signalements santé
- **disease_trends** - Tendances maladies  
- **health_alerts** - Alertes sanitaires
- **notifications** - Notifications utilisateurs

### Fonctions DB:
- CRUD complet sur toutes les tables
- Index pour performances (localisation, dates)
- Triggers pour calculs automatiques
- Relations entre tables

---

## 🔄 Flux Principaux

1. **Inscription** → Email vérification → Connexion
2. **Signalement** → Validation → Calcul tendances → Alertes
3. **Dashboard Admin** → Validation signalements → Création alertes
4. **API Publique** → Statistiques → Tendances → Alertes

Total: **20 fonctions principales** réparties dans **8 fichiers** backend
