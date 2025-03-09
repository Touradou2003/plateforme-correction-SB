# Plateforme d'Évaluation Automatisée des Exercices de Bases de Données

Une plateforme web moderne permettant aux professeurs de créer et gérer des exercices de bases de données, et aux étudiants de soumettre leurs réponses avec évaluation automatique par IA.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Sommaire

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Déploiement](#déploiement)
- [Utilisation](#utilisation)
- [Securité](#securité)
- [API Documentation](#api-documentation)
- [Tests](#tests)
- [Contribution](#contribution)
- [Licence](#licence)
- [Contact](#contact)

## 🚀 Présentation

La Plateforme d'Évaluation Automatisée des Exercices de Bases de Données est une solution complète permettant aux professeurs de déposer des sujets d'exercices en bases de données et aux étudiants de soumettre leurs réponses. L'application intègre un moteur d'intelligence artificielle basé sur DeepSeek via Ollama pour automatiser le processus de correction, de notation et de feedback détaillé.

### Objectifs

- Faciliter la création et la gestion des exercices de bases de données
- Automatiser la correction des soumissions étudiantes
- Fournir des retours détaillés et personnalisés aux étudiants
- Offrir des analyses de performance pour les professeurs et les étudiants
- Garantir la sécurité et la confidentialité des données

## ✨ Fonctionnalités

### Pour les professeurs

- Création et gestion de comptes avec authentification sécurisée
- Dépôt de sujets d'examen en format texte/PDF
- Ajout de plusieurs modèles de correction pour chaque exercice
- Consultation et ajustement des notes générées par l'IA
- Tableau de bord détaillé avec statistiques des performances des étudiants
- Détection de plagiat automatique

### Pour les étudiants

- Création et gestion de comptes (authentification classique ou via OAuth2)
- Accès aux sujets déposés par les professeurs
- Soumission de réponses en format PDF (avec Drag & Drop)
- Consultation des corrections automatiques et des notes attribuées
- Suivi des performances avec des graphiques d'évolution

### Fonctionnalités IA

- Correction automatique basée sur DeepSeek via Ollama
- Analyse syntaxique des requêtes SQL (si applicable)
- Notation intelligente prenant en compte différentes approches de réponse
- Génération de feedback détaillé sur les erreurs et suggestions d'amélioration
- Apprentissage continu pour améliorer la précision des corrections

## 🏗️ Architecture

La plateforme est construite selon une architecture microservices pour assurer la scalabilité et la résilience :

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│   Backend   │────▶│ IA Service  │
│ (React.js)  │◀────│  (Node.js)  │◀────│ (Python)    │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Database   │────▶│   Storage   │
                    │ (PostgreSQL)│     │    (S3)     │
                    └─────────────┘     └─────────────┘
```

- **Frontend** : Interface utilisateur responsive construite avec React.js/Vue.js
- **Backend** : API RESTful développée avec Node.js/Django
- **IA Service** : Microservice Python dédié au traitement par IA avec DeepSeek via Ollama
- **Database** : Base de données PostgreSQL pour stocker les données de l'application
- **Storage** : Service de stockage cloud pour les fichiers PDF (AWS S3, MinIO, etc.)

## 🏗️ Structure 

## 🏗️ Structure

```
/plateforme-evaluation-bdd/
├── .github/                      # Configuration CI/CD pour GitHub Actions
│   └── workflows/
│       └── deploy.yml
├── docker/                       # Fichiers de configuration Docker
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── Dockerfile.ia
│   └── docker-compose.yml
│
├── backend/                      # API backend (Django/Node.js)
│   ├── app/
│   │   ├── controllers/          # Contrôleurs
│   │   ├── models/               # Modèles de données
│   │   ├── services/             # Services métier
│   │   ├── middlewares/          # Middlewares
│   │   └── utils/                # Fonctions utilitaires
│   ├── config/                   # Configuration du backend
│   ├── routes/                   # Routes API
│   ├── tests/                    # Tests unitaires et d'intégration
│   ├── package.json              # (Pour Node.js)
│   └── requirements.txt          # (Pour Django)
│
├── frontend/                     # Application frontend (React/Vue.js)
│   ├── public/                   # Fichiers statiques
│   ├── src/
│   │   ├── assets/               # Images, fonts, etc.
│   │   ├── components/           # Composants réutilisables
│   │   │   ├── common/           # Éléments d'interface communs
│   │   │   ├── dashboard/        # Composants du tableau de bord
│   │   │   ├── auth/             # Composants d'authentification
│   │   │   ├── professor/        # Composants spécifiques aux professeurs
│   │   │   └── student/          # Composants spécifiques aux étudiants
│   │   ├── hooks/                # Hooks personnalisés
│   │   ├── layouts/              # Layouts de page
│   │   ├── pages/                # Pages de l'application
│   │   ├── services/             # Services API
│   │   ├── store/                # Store global (Redux/Vuex)
│   │   ├── utils/                # Fonctions utilitaires
│   │   ├── App.jsx               # Composant principal
│   │   └── main.jsx              # Point d'entrée
│   ├── .env.development          # Variables d'environnement dev
│   ├── .env.production           # Variables d'environnement prod
│   └── package.json              # Dépendances
│
├── ia-service/                   # Service d'intelligence artificielle
│   ├── app/
│   │   ├── models/               # Modèles IA pré-entraînés
│   │   ├── services/             # Services d'IA
│   │   │   ├── correction.py     # Service de correction
│   │   │   ├── notation.py       # Service de notation
│   │   │   └── feedback.py       # Service de feedback
│   │   ├── utils/                # Fonctions utilitaires
│   │   └── server.py             # API du service IA
│   ├── tests/                    # Tests unitaires
│   └── requirements.txt          # Dépendances Python
│
├── k8s/                          # Configuration Kubernetes
│   ├── backend.yaml
│   ├── frontend.yaml
│   ├── ia-service.yaml
│   └── database.yaml
│
├── scripts/                      # Scripts utilitaires
│   ├── setup.sh
│   ├── seed-db.js
│   └── deployment.sh
│
├── documentation/                # Documentation du projet
│   ├── api/                      # Documentation de l'API
│   ├── architecture/             # Documentation de l'architecture
│   ├── guides/                   # Guides d'utilisation
│   │   ├── student.md
│   │   └── professor.md
│   └── manuel-utilisateur.pdf    # Manuel utilisateur complet
│
├── .gitignore                    # Fichiers à ignorer par Git
├── .env.example                  # Exemple de variables d'environnement
├── LICENSE                       # Licence du projet
└── README.md
```

## 🔧 Technologies

### Frontend
- React.js / Vue.js
- Tailwind CSS / Material UI
- Recharts / Chart.js pour la visualisation
- Axios pour les requêtes HTTP

### Backend
- Node.js avec Express / Django (Python)
- JWT pour l'authentification
- Multer pour la gestion des fichiers
- Swagger pour la documentation API

### IA & NLP
- Ollama pour l'hébergement local de modèles d'IA
- DeepSeek comme modèle principal
- PDFKit/PyPDF2 pour l'analyse des documents

### Base de données
- PostgreSQL / MongoDB / MySQL

### Stockage fichiers
- AWS S3 / Google Cloud Storage / MinIO

### Déploiement
- Docker et Docker Compose
- Kubernetes pour l'orchestration
- GitHub Actions pour CI/CD

## 📋 Prérequis

- Node.js (v18+)
- Python (v3.9+)
- Docker et Docker Compose
- Ollama installé (pour le développement local de l'IA)
- Compte AWS/GCP/Azure (pour le stockage en production)
- PostgreSQL / MongoDB

## 🔌 Installation

### Cloner le repository

```bash
git clone https://github.com/astouthierno/plateforme-correction-SB.git
cd plateforme-evaluation-bdd
```

### Variables d'environnement

Copiez le fichier d'exemple et configurez vos variables d'environnement :

```bash
cp  .env
# Modifiez les variables dans .env selon votre configuration
```

### Installation avec Docker

```bash
# Construction et démarrage des conteneurs
docker-compose up -d

# Vérifier que les services sont bien lancés
docker-compose ps
```

### Installation manuelle (développement)

#### Backend

```bash
cd backend
npm install       # Pour Node.js
# OU
pip install -r requirements.txt  # Pour Django
```

#### Frontend

```bash
cd frontend
npm install
```

#### Service IA

```bash
cd ia-service
pip install -r requirements.txt
```

## 🌍 Déploiement

### Déploiement sur serveur VPS

```bash
# Préparation du déploiement
./scripts/deployment.sh

# Ou manuellement
docker-compose -f docker/docker-compose.prod.yml up -d
```

### Déploiement sur Kubernetes

```bash
# Appliquer les configurations Kubernetes
kubectl apply -f k8s/
```

## 📖 Utilisation

### Accès à l'application

- **Interface Web** : http://localhost:3000 (développement) ou votre domaine en production
- **API Backend** : http://localhost:5000/api (développement)
- **Documentation API** : http://localhost:5000/api-docs

### Compte Professeur

1. Inscription/Connexion à la plateforme
2. Création d'un nouveau sujet d'exercice
3. Ajout de modèles de correction
4. Consultation du tableau de bord et des statistiques

### Compte Étudiant

1. Inscription/Connexion à la plateforme
2. Accès aux exercices disponibles
3. Soumission des réponses (PDF)
4. Consultation des corrections et des notes

## 🔒 Sécurité

- Authentification renforcée via JWT et OAuth2
- Chiffrement des fichiers PDF soumis
- Détection de plagiat automatique
- Validation des entrées côté client et serveur
- Protection contre les attaques CSRF et XSS

## 📚 API Documentation

La documentation complète de l'API est disponible à l'adresse suivante :

- En développement : http://localhost:5000/api-docs
- En production : https://votre-domaine.com/api-docs

## 🧪 Tests

### Tests unitaires

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test

# Service IA
cd ia-service
pytest
```

### Tests d'intégration

```bash
npm run test:integration
```

### Tests de charge

```bash
npm run test:load
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment vous pouvez contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

Veuillez respecter les normes de codage et ajouter des tests pour les nouvelles fonctionnalités.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.

## 📬 Contact

Pour toute question ou suggestion, n'hésitez pas à nous contacter :

- Email : 
- Issue Tracker : [GitHub Issues](https://github.com/astouthierno/plateforme-correction-SB.git)