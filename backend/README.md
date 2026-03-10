# Salemty-TN Backend Structure

## Architecture

```
backend/
├── src/
│   ├── controllers/          # Logique métier
│   ├── models/              # Modèles de données
│   ├── routes/              # Routes API
│   ├── middleware/          # Middleware (auth, validation)
│   ├── services/            # Services externes (email, SMS)
│   ├── config/              # Configuration (DB, JWT)
│   ├── utils/               # Fonctions utilitaires
│   └── app.js               # Point d'entrée principal
├── database/
│   ├── migrations/          # Scripts de migration
│   ├── seeds/               # Données initiales
│   └── schema.sql           # Schéma SQL
├── tests/                   # Tests unitaires et intégration
├── docs/                    # Documentation API
├── .env                     # Variables d'environnement
├── package.json
└── server.js                # Démarrage du serveur
```

## Technologies Recommandées

- **Node.js** avec **Express.js**
- **MongoDB** avec **Mongoose** (ou PostgreSQL avec Sequelize)
- **JWT** pour l'authentification
- **bcrypt** pour le hashage des mots de passe
- **nodemailer** pour les emails
- **multer** pour l'upload de fichiers
- **joi** pour la validation
- **winston** pour les logs
