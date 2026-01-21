# 📦 File Downloader - Système moderne de gestion de fichiers

<div align="center">
 <img src =https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white>
 <img src =https://img.shields.io/badge/Material--UI-5.15-007FFF?style=for-the-badge&logo=mui&logoColor=white>
 <img src =https://img.shields.io/badge/Flask-3.1.2-000000?style=for-the-badge&logo=flask&logoColor=white>
 <img src =https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=flask&logoColor=white>
 <img src =https://img.shields.io/badge/Tests-Passing-success?style=for-the-badge&logo=flask&logoColor=white>
 <img src =https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=flask&logoColor=white>


**Application web moderne pour lister et télécharger des fichiers**

</div>

---

## 🎯 À propos

File Downloader est une application full-stack avec **React**, **Material-UI** et **Flask** permettant de :

- Lister, rechercher et trier les fichiers
- Télécharger des fichiers depuis le serveur
- Profiter d'une interface responsive et dark mode
- Recevoir un feedback visuel complet (loading, success, error)

---

## 📸 Interface

<img width="930" height="910" alt="test_n1" src="https://github.com/user-attachments/assets/06b5e695-c950-4cda-b38a-ca447517db9f" />

<img width="1891" height="898" alt="test_n2" src="https://github.com/user-attachments/assets/6372e276-817c-40bd-8ef5-c0f16d1b2a93" />

---

## ✨ Fonctionnalités principales

### 🎨 Frontend (React + Material-UI)

#### Core Features
- 📋 Double Vue : Grille (cards visuelles) et Tableau (DataGrid professionnel)
- 🔍 Recherche en temps réel : Filtrage instantané par nom de fichier
- 🔢 Tri intelligent : Par nom, taille ou date 
- 📥 Téléchargement optimisé : Gestion des Blobs avec cleanup mémoire
- 📊 Statistiques : Nombre de fichiers et taille totale affichés

### UX/UI Advanced
- 🎭 Dark Mode : Toggle instantané avec persistance visuelle
- 💬 Notifications : Snackbars Material-UI pour feedback (succès/erreur)
- ⏳ Skeleton Loaders : Placeholders animés pendant le chargement
- 🎨 Animations : Hover effects et transitions fluides
- 📱 Responsive Design : Adaptatif mobile/tablet/desktop
- 🖼️ Icônes par type : Reconnaissance visuelle PDF, Images, Documents, etc.
- 🔍 Barre de recherche

 #### State Management

- ✅ Loading State : Skeleton loaders professionnels
- ❌ Error State : Messages explicites avec bouton "Réessayer"
- 📭 Empty State : Instructions claires pour l'utilisateur


### ⚙️ Backend (Python + Flask)
#### API RESTful

- 🌐 GET /api/files : Liste tous les fichiers avec métadonnées
- 📥 GET /download/<name> : Télécharge un fichier spécifique
- 🔐 CORS : Configuration pour communication cross-origin
- ⏱️ Error Handling : Gestion robuste des erreurs (404, 500, timeout)

#### Features

- 📂 Lecture depuis un dossier local files/
- 📊 Métadonnées complètes (nom, taille, date de modification, type)
- 🔍 Filtrage automatique des fichiers système et cachés
- 🛡️ Validation des types de fichiers autorisés
---

## 🚀 Installation

#### Prérequis

- Node.js >= 16.x
- npm >= 8.x
- Python >= 3.8
- pip >= 21.x
- 
#### Configuration du Backend
- Se déplacer dans le dossier backend : `cd backend`
- ajouter un dossier nommé files ' mkdir files '
- Créer l'environnement virtuel : `python -m venv venv`
- Activer l'environnement virtuel :
  * Windows : `venv\Scripts\activate`
  * macOS / Linux : `source venv/bin/activate`
- Installer les dépendances : `pip install -r requirements.txt`
- Lancer le serveur Backend : `python app.py`              

#### Configuration du Frontend
- Se déplacer dans le dossier frontend (dans un nouveau terminal) : `cd frontend`
- Installer les dépendances : `npm install`
- Lancer le serveur React : `npm start`
-     
## 📡 Exemples d’appels API5
- Liste des fichiers : curl http://localhost:5000/api/files
- ```json

  {
    "last_modified": "2025-10-23T15:55:51.732451Z",
    "name": "PDFnum1.pdf",
    "size": 242612,
    "type": "pdf"
  }

- Télécharger un fichier : curl -O http://localhost:5000/download/PDFnum1.pdf
## 🧪 Procédure pour exécuter les tests
-  backend :
  * cd backend -
  * pytest -v tests/test_app.py
-  frontend :
   * cd frontend
   * npm test




## 📞 Contact

**[Cyrine_Gabsi]** - [cyrine.gabsi@esprit.tn](mailto:cyrine.gabsi@esprit.tn)


---

Made with ❤️ by Cyrine Gabsi 
