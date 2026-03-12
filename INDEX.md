# 📑 Index Complet - Tous les Fichiers Générés

## 🎯 Guide Rapide

### Pour Démarrer Immédiatement

1. **Lire**: [QUICKSTART.md](QUICKSTART.md) - 5 minutes
2. **Exécuter**: `docker-compose up -d` ou `./setup.sh` (Linux/Mac) ou `setup.bat` (Windows)
3. **Tester**: [TESTING.md](backend/TESTING.md)

### Pour Comprendre l'Architecture

1. Lire: [README.md](README.md)
2. Lire: [CHANGELOG.md](CHANGELOG.md)
3. Lire: [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

### Pour Intégrer avec le Frontend

1. Lire: [backend/FRONTEND_INTEGRATION.md](backend/FRONTEND_INTEGRATION.md)
2. Copier les services Angular
3. Configurer les routes

### Pour Déployer en Production

1. Lire: [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md)
2. Configurer l'environnement
3. Déployer avec Docker ou Nginx

---

## 📚 Documentation Complète

### 📖 Principal

| Fichier                        | Description                       | Priorité |
| ------------------------------ | --------------------------------- | -------- |
| [README.md](README.md)         | Vue d'ensemble complète du projet | ⭐⭐⭐   |
| [QUICKSTART.md](QUICKSTART.md) | Guide démarrage 5 minutes         | ⭐⭐⭐   |
| [CHANGELOG.md](CHANGELOG.md)   | Historique des changements        | ⭐⭐     |

### 🔧 Backend Documentation

| Fichier                                                            | Description                 | Priorité |
| ------------------------------------------------------------------ | --------------------------- | -------- |
| [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)       | Endpoints API détaillés     | ⭐⭐⭐   |
| [backend/TESTING.md](backend/TESTING.md)                           | Guide de test Postman/cURL  | ⭐⭐⭐   |
| [backend/FRONTEND_INTEGRATION.md](backend/FRONTEND_INTEGRATION.md) | Intégration Angular         | ⭐⭐⭐   |
| [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md)                     | Déploiement production      | ⭐⭐     |
| [backend/FILES_SUMMARY.md](backend/FILES_SUMMARY.md)               | Résumé des fichiers générés | ⭐       |

---

## 🔧 Configuration

### Fichiers de Configuration

| Fichier                  | Type          | Location                      | Description                             |
| ------------------------ | ------------- | ----------------------------- | --------------------------------------- |
| `application.properties` | Configuration | `backend/src/main/resources/` | Config Spring Boot, MongoDB, JWT, Email |
| `.env.example`           | Exemple       | Racine                        | Variables d'environnement               |
| `pom.xml`                | Build         | `backend/`                    | Dépendances Maven                       |
| `docker-compose.yml`     | Docker        | Racine                        | Orchestration services                  |
| `Dockerfile`             | Docker        | `backend/`                    | Image Backend                           |

### Variables d'Environnement

```properties
# Copier .env.example en .env et remplir:
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
SPRING_MAIL_USERNAME=...
SPRING_MAIL_PASSWORD=...
```

---

## 🛠️ Code Source

### Backend - Structure Complète

#### 📦 Models (Entities)

```
backend/src/main/java/com/salemty/salemty_tn/model/
├── User.java                  (Utilisateurs)
├── HealthReport.java          (Signalements sanitaires)
├── HealthAlert.java           (Alertes sanitaires)
├── Notification.java          (Notifications)
└── EmailToken.java            (Tokens email)
```

#### 📤 DTOs (Data Transfer)

```
backend/src/main/java/com/salemty/salemty_tn/dto/
├── RegisterRequest.java
├── LoginRequest.java
├── LoginResponse.java
├── UserProfileDTO.java
├── UpdateProfileRequest.java
├── HealthReportDTO.java
├── HealthAlertDTO.java
├── PasswordResetRequest.java
└── ApiResponse.java           (Réponse standardisée)
```

#### 🗄️ Repositories (Data Access)

```
backend/src/main/java/com/salemty/salemty_tn/repository/
├── UserRepository.java
├── HealthReportRepository.java
├── HealthAlertRepository.java
├── NotificationRepository.java
└── EmailTokenRepository.java
```

#### 🛠️ Services (Business Logic)

```
backend/src/main/java/com/salemty/salemty_tn/service/
├── AuthService.java           (Interface)
├── AuthServiceImpl.java        (Implémentation)
├── JwtService.java            (JWT Management)
├── EmailService.java          (Email Management)
├── HealthService.java         (Interface)
├── HealthServiceImpl.java      (Implémentation)
├── UserService.java           (Interface)
├── UserServiceImpl.java        (Implémentation)
├── AdminService.java          (Interface)
└── AdminServiceImpl.java       (Implémentation)
```

#### 🎮 Controllers (REST API)

```
backend/src/main/java/com/salemty/salemty_tn/controller/
├── AuthController.java        (Authentication endpoints)
├── HealthController.java      (Health reports endpoints)
├── UserController.java        (User endpoints)
├── AdminController.java       (Admin endpoints)
└── AlertController.java       (Alert endpoints)
```

#### ⚙️ Configuration

```
backend/src/main/java/com/salemty/salemty_tn/config/
├── JwtConfig.java             (JWT Configuration)
├── SecurityConfig.java        (Security & CORS)
├── WebConfig.java             (Web MVC)
└── MongoDBIndexConfig.java    (Database Indexes)
```

#### 🛡️ Filtres & Handlers

```
backend/src/main/java/com/salemty/salemty_tn/filter/
└── JwtAuthenticationFilter.java

backend/src/main/java/com/salemty/salemty_tn/exception/
└── GlobalExceptionHandler.java
```

#### 🧰 Utilitaires

```
backend/src/main/java/com/salemty/salemty_tn/constant/
└── AppConstants.java          (Constantes)

backend/src/main/java/com/salemty/salemty_tn/util/
└── ValidationUtil.java        (Validation)
```

---

## 🚀 Scripts de Démarrage

### Linux/Mac

```bash
chmod +x setup.sh
./setup.sh
```

### Windows

```batch
setup.bat
```

### Docker (Tous les OS)

```bash
docker-compose up -d
```

---

## 📊 API Endpoints Complets

### ✅ Authentication (6)

- POST `/auth/register` - Inscription
- POST `/auth/login` - Connexion
- POST `/auth/verify-email?token=` - Vérifier email
- POST `/auth/forgot-password?email=` - Récupération
- POST `/auth/reset-password?token=` - Réinitialisation
- GET `/auth/me` - Profil utilisateur

### ✅ Health (6)

- POST `/health/reports/submit` - Soumettre signalement
- GET `/health/reports` - Lister signalements
- GET `/health/trends` - Tendances
- GET `/health/stats` - Statistiques
- GET `/health/alerts` - Alertes actives
- POST `/admin/alerts` - Créer alerte

### ✅ User (4)

- GET `/users/profile` - Voir profil
- PUT `/users/profile` - Modifier profil
- DELETE `/users/account` - Supprimer compte
- GET `/users/notifications` - Notifications

### ✅ Admin (4)

- GET `/admin/users` - Gérer utilisateurs
- PUT `/admin/reports/{id}/validate?status=` - Valider
- POST `/admin/alerts` - Créer alerte
- GET `/admin/reports/generate` - Générer rapport

---

## 📋 Checklist de Configuration

### Avant de Lancer

- [ ] MongoDB URI correcte dans `application.properties`
- [ ] Email SMTP configuré (Gmail App Password)
- [ ] JWT secret changé en production
- [ ] Java 21 installé
- [ ] Maven 3.8+ installé
- [ ] Node.js 18+ installé
- [ ] Docker installé (optionnel)

### Après le Lancement

- [ ] API accessible à `http://localhost:8080/api`
- [ ] Frontend accessible à `http://localhost:4200`
- [ ] Tester enregistrement utilisateur
- [ ] Tester login
- [ ] Tester signalement sanitaire
- [ ] Tester récupération profil

---

## 🧪 Testing

### Outils Recommandés

- **Postman**: Importer depuis API_DOCUMENTATION.md
- **cURL**: Exemples dans TESTING.md
- **Thunder Client**: VS Code extension
- **REST Client**: VS Code extension

### Flow de Test

1. Register → Vérifier email
2. Login → Récupérer token
3. Submit report → Tester santé
4. Get stats → Vérifier statistiques
5. Update profile → Tester utilisateur

---

## 📱 Frontend Pages

### Déjà structurées dans `Salemty-TN/src/app/`

```
pages/
├── home.component.ts         - Dashboard principal
├── carte.component.ts        - Carte interactive
├── signaler.component.ts     - Signaler symptômes
├── previsions.component.ts   - Prévisions maladies
├── prevention.component.ts   - Conseils prévention
├── contact.component.ts      - Nous contacter
├── profil.component.ts       - Profil utilisateur
├── signin.component.ts       - Connexion
└── signup.component.ts       - Inscription

components/
├── header.component.ts       - En-tête
└── footer.component.ts       - Pied de page
```

---

## 🐳 Docker

### Services

- **Backend**: Port 8080 (Java 21 + Spring Boot)
- **Frontend**: Port 4200 (Angular)
- **MongoDB**: Port 27017 (Database)

### Commandes

```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Logs
docker-compose logs -f salemty-backend

# Rebuild
docker-compose up -d --build
```

---

## 📞 Support

### Documentation

- **Quick Start**: Voir QUICKSTART.md
- **API Docs**: Voir backend/API_DOCUMENTATION.md
- **Testing**: Voir backend/TESTING.md
- **Integration**: Voir backend/FRONTEND_INTEGRATION.md
- **Deployment**: Voir backend/DEPLOYMENT.md

### Erreurs Courantes

Voir TESTING.md section "Common Issues"

### Besoin d'Aide?

1. Lire la documentation pertinente
2. Vérifier les fichiers d'exemple
3. Consulter les logs
4. Tester avec cURL

---

## 🎯 Prochaines Étapes

### Court Terme (Jour 1)

- [x] Backend configuré
- [x] API endpoints disponibles
- [ ] Frontend pages intégrées
- [ ] Tests API effectués

### Moyen Terme (Semaine 1)

- [ ] Frontend complètement intégré
- [ ] Email SMTP configuré
- [ ] Tests utilisateurs
- [ ] Base de données peuplée

### Long Terme (Production)

- [ ] Déploiement Docker
- [ ] HTTPS/SSL configuré
- [ ] Monitoring activé
- [ ] Sauvegardes automatisées

---

## 📊 Statistiques

| Catégorie      | Nombre |
| -------------- | ------ |
| Endpoints API  | 20+    |
| Services       | 10     |
| Models         | 5      |
| DTOs           | 9      |
| Repositories   | 5      |
| Controllers    | 5      |
| Fichiers doc   | 10+    |
| Lignes de code | 5000+  |

---

## 🎓 Ressources Utiles

### Documentation Officielle

- [Spring Boot 3.5.11](https://spring.io/projects/spring-boot)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Angular Latest](https://angular.io/docs)
- [JWT.io](https://jwt.io)

### Communautés

- Spring Community
- MongoDB Atlas Support
- Angular Community
- Stack Overflow

---

## 📜 License

MIT License - Utilisable librement pour ce projet académique.

---

**Tous les fichiers sont générés et prêts à l'emploi!** 🎉

Commencez par [QUICKSTART.md](QUICKSTART.md) pour les 5 prochaines minutes!
