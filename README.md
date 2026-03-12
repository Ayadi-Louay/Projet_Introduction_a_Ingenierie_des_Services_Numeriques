# SalemtyTN - Plateforme de Surveillance Sanitaire

## 🏥 Vue d'ensemble

SalemtyTN est une plateforme complète de surveillance sanitaire en Tunisie permettant:

- Signalement des symptômes par les citoyens
- Collecte de données sanitaires en temps réel
- Carte interactive des zones à risque
- Alertes sanitaires locales et nationales
- Prévisions des maladies saisonnières
- Conseils de prévention personnalisés
- Gestion des alertes pour autorités sanitaires

## 🛠️ Stack Technologique

### Backend

- **Java 21** + **Spring Boot 3.5.11**
- **MongoDB Atlas** (Cloud Database)
- **JWT** (Authentication)
- **Maven** (Build Tool)

### Frontend

- **Angular** (Latest version)
- **TypeScript**
- **Bootstrap/Tailwind CSS**

## 📋 Structure du Projet

```
Projet_Introduction_a_Ingenierie_des_Services_Numeriques/
├── backend/                          # Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/salemty/salemty_tn/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       ├── service/
│   │   │   │       ├── filter/
│   │   │   │       ├── exception/
│   │   │   │       └── SalemtyTnApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   ├── Dockerfile
│   ├── API_DOCUMENTATION.md
│   ├── TESTING.md
│   ├── FRONTEND_INTEGRATION.md
│   └── DEPLOYMENT.md
├── Salemty-TN/                       # Frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── app.routes.ts
│   │   └── environments/
│   ├── package.json
│   └── angular.json
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 Démarrage Rapide

### Prérequis

- Java 21 JDK
- Node.js 18+ & npm
- Maven 3.8+
- MongoDB Atlas Account

### 1. Configuration du Backend

```bash
# Aller dans le dossier backend
cd backend

# Configurer les variables d'environnement
# Copier et éditer application.properties avec votre MongoDB URI

# Construire le projet
mvn clean package

# Lancer l'application
mvn spring-boot:run
```

L'API sera disponible sur: `http://localhost:8080/api`

### 2. Configuration du Frontend

```bash
# Aller dans le dossier frontend
cd Salemty-TN

# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve --open
```

L'application sera accessible sur: `http://localhost:4200`

### 3. Avec Docker Compose (Recommandé)

```bash
# À partir du répertoire racine du projet
docker-compose up -d

# Pour arrêter
docker-compose down
```

## 📚 API Endpoints

### Authentication (6 endpoints)

```
POST   /api/auth/register              - Inscription
POST   /api/auth/login                 - Connexion
POST   /api/auth/verify-email          - Vérification email
POST   /api/auth/forgot-password       - Récupération mot de passe
POST   /api/auth/reset-password        - Réinitialisation mot de passe
GET    /api/auth/me                    - Profil utilisateur
```

### Health Reports (6 endpoints)

```
POST   /api/health/reports/submit      - Soumettre signalement
GET    /api/health/reports             - Lister signalements
GET    /api/health/trends              - Tendances maladies
GET    /api/health/stats               - Statistiques
GET    /api/health/alerts              - Alertes actives
```

### User (4 endpoints)

```
GET    /api/users/profile              - Voir profil
PUT    /api/users/profile              - Modifier profil
DELETE /api/users/account              - Supprimer compte
GET    /api/users/notifications        - Notifications
```

### Admin (4 endpoints)

```
GET    /api/admin/users                - Gérer utilisateurs
PUT    /api/admin/reports/{id}/validate - Valider signalements
POST   /api/admin/alerts               - Créer alertes
GET    /api/admin/reports/generate     - Générer rapports
```

## 📖 Documentation

- [API Documentation](backend/API_DOCUMENTATION.md) - Endpoints et modèles détaillés
- [Testing Guide](backend/TESTING.md) - Guide de test avec Postman/cURL
- [Frontend Integration](backend/FRONTEND_INTEGRATION.md) - Intégration Angular
- [Deployment Guide](backend/DEPLOYMENT.md) - Déploiement en production

## 🔐 Security Features

✅ **JWT Authentication** - Tokens sécurisés  
✅ **BCrypt Password Hashing** - Hash des mots de passe  
✅ **CORS Protection** - Configuration CORS  
✅ **Email Verification** - Tokens d'activation  
✅ **Password Reset** - Récupération sécurisée  
✅ **Input Validation** - Validation des données

## 🗄️ Database

**MongoDB Atlas**

- URI: `mongodb+srv://ayadilouay04_db_user:0000@salemtytn.2rx1vt1.mongodb.net/?appName=SalemtyTN`
- Database: `salemtytn`
- Collections: users, health_reports, health_alerts, notifications, email_tokens

## 📊 Features Principales

### Pour les Citoyens

- ✅ Inscription/Login sécurisé
- ✅ Soumission de signalements anonymes ou nominatifs
- ✅ Consultation des alertes sanitaires
- ✅ Carte interactive des zones à risque
- ✅ Conseils de prévention personnalisés
- ✅ Gestion du profil utilisateur
- ✅ Notifications en temps réel

### Pour les Autorités Sanitaires

- ✅ Dashboard d'administration
- ✅ Validation des signalements
- ✅ Création d'alertes sanitaires
- ✅ Analyse des tendances épidémiologiques
- ✅ Génération de rapports
- ✅ Gestion des utilisateurs
- ✅ Statistiques en temps réel

## 🛠️ Configuration Importante

### Variables d'Environnement

```properties
# MongoDB
spring.data.mongodb.uri=mongodb+srv://...

# JWT
jwt.secret=your_secret_key_here
jwt.expiration=86400000

# Email
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

### Email Configuration (Gmail)

1. Activer 2FA sur Gmail
2. Générer "App Password"
3. Utiliser l'app password dans application.properties

## 🧪 Testing

### Postman Collection

Importer les endpoints depuis [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

### cURL Examples

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Submit Report
curl -X POST http://localhost:8080/api/health/reports/submit \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"Fever","governorate":"Tunis"}'
```

## 📱 Routes Frontend

- `/` - Accueil
- `/signin` - Connexion
- `/signup` - Inscription
- `/home` - Dashboard principal
- `/carte` - Carte interactive
- `/signaler` - Signaler symptômes
- `/previsions` - Prévisions maladies
- `/prevention` - Conseils prévention
- `/contact` - Nous contacter
- `/profil` - Profil utilisateur

## 🚀 Déploiement Production

### Avec Docker

```bash
docker-compose -f docker-compose.yml up -d
```

### Avec Nginx (Reverse Proxy)

```bash
# Voir DEPLOYMENT.md pour configuration complète
```

### Variables d'Environnement Production

```bash
cp .env.example .env
# Éditer .env avec les vraies valeurs
```

## 📞 Support & Documentation

- **API Docs**: [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)
- **Testing Guide**: [backend/TESTING.md](backend/TESTING.md)
- **Deployment**: [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md)
- **Frontend Integration**: [backend/FRONTEND_INTEGRATION.md](backend/FRONTEND_INTEGRATION.md)

## 🔄 Workflow de Développement

### Backend Development

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Development

```bash
cd Salemty-TN
npm install
ng serve --open
```

### Running Tests

```bash
cd backend
mvn test
```

## 📈 Roadmap

- [ ] Tests unitaires complets
- [ ] Cache Redis
- [ ] WebSocket pour notifications en temps réel
- [ ] Intégration SMS alerts
- [ ] Machine Learning pour prédictions
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Analytics avancées

## 🤝 Contributing

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT.

## 👥 Équipe

Projet développé pour l'Introduction à l'Ingénierie des Services Numériques

## 📅 Statut du Projet

**Status**: ✅ En développement  
**Version**: 1.0.0  
**Date**: 2024-2025

---

**Questions?** Consultez la [documentation complète](backend/API_DOCUMENTATION.md) ou contactez l'équipe de développement.
