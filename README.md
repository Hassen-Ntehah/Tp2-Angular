# Gestion des Tâches - Application Web MEAN Stack

Une application complète de liste de tâches (To-Do List) développée avec la stack **MEAN** (**M**ongoDB, **E**xpress.js, **A**ngular, **N**ode.js).

---

## 📁 Structure du Projet

Le projet est structuré en deux dossiers distincts :

```text
TP2-Angular/
├── backend/
│   ├── models/
│   │   └── Task.js          # Schéma et modèle Mongoose
│   ├── routes/
│   │   └── tasks.js         # Routes d'API REST (/tasks)
│   ├── package.json         # Dépendances Node.js (express, mongoose, cors)
│   └── server.js            # Point d'entrée de l'API Express (port 3000)
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/
│   │   │   │   └── task.model.ts     # Interface TypeScript Task
│   │   │   ├── services/
│   │   │   │   └── task.service.ts   # Service HTTP Angular (CRUD)
│   │   │   ├── app.ts                # Composant racine Angular
│   │   │   ├── app.html              # Template UI Bootstrap
│   │   │   ├── app.css               # Styles du composant
│   │   │   ├── app.spec.ts           # Tests unitaires du composant
│   │   │   └── app.config.ts         # Configuration des providers (provideHttpClient)
│   │   ├── styles.css                # Import global de Bootstrap
│   │   └── index.html                # Page d'accueil HTML
│   ├── angular.json
│   └── package.json                  # Dépendances Angular & Bootstrap
│
└── README.md
```

---

## 🚀 Fonctionnalités Implémentées

### 1. Backend (`/backend`)
- **Node.js & Express.js** : API REST rapide et modulaire.
- **Mongoose & MongoDB** : Modèle de données `Task` connecté à la base locale `mongodb://127.0.0.1:27017/todolist_mean`.
- **CORS** : Sécurisé et configuré pour autoriser les requêtes venant d'Angular (`http://localhost:4200`).
- **Endpoints RESTful** :
  | Méthode | Route | Description |
  | :--- | :--- | :--- |
  | `GET` | `/tasks` | Récupère la liste de toutes les tâches (triées par date de création) |
  | `POST` | `/tasks` | Crée une nouvelle tâche (`title`, `description`, `completed`) |
  | `PUT` | `/tasks/:id` | Modifie une tâche (titre, description ou statut) |
  | `DELETE` | `/tasks/:id` | Supprime une tâche existante |

### 2. Frontend (`/frontend`)
- **Angular (Standalone Components)** avec `provideHttpClient()` et `FormsModule`.
- **Intégration Bootstrap 5** pour une interface soignée, responsive et accessible.
- **Interface bilingue / française** :
  - Titre principal : `Gestion des tâches`.
  - Formulaire de saisie :
    - Champ texte pour le titre (placeholder : `Titre de la tâche`).
    - Champ texte multi-lignes pour la description (placeholder : `Description de la tâche`).
    - Bouton bleu primaire `Ajouter une tâche` (qui se transforme en `Enregistrer la modification` en mode édition, avec un bouton `Annuler`).
  - Liste interactive des tâches :
    - Titre barré (`text-decoration-line-through`) lorsque la tâche est complétée.
    - Bouton vert (`btn-success`) basculant entre `Terminer` et `Reprendre`.
    - Bouton jaune (`Modifier`) pour charger la tâche dans le formulaire.
    - Bouton rouge (`btn-danger`) `Supprimer` avec confirmation.

---

## 🛠️ Prérequis

- [Node.js](https://nodejs.org/) (version 18+ recommandée)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) installé localement ou exécuté via Docker

---

## ⚙️ Instructions de Démarrage Étape par Étape

### Étape 1 : Démarrer MongoDB

#### Option A : Si MongoDB est installé via Homebrew (macOS)
```bash
brew services start mongodb-community
# ou directement :
mongod --config /opt/homebrew/etc/mongod.conf
```

#### Option B : Si vous utilisez Docker
```bash
docker run -d -p 27017:27017 --name mongo-todolist mongo:latest
```

---

### Étape 2 : Démarrer le Serveur Backend

1. Ouvrez un premier terminal et naviguez dans le dossier `backend` :
   ```bash
   cd backend
   ```
2. Installez les dépendances si ce n'est pas déjà fait :
   ```bash
   npm install
   ```
3. Lancez le serveur Express :
   ```bash
   npm start
   # ou en mode développement (rechargement automatique) :
   npm run dev
   ```
4. Le serveur démarre sur : [http://localhost:3000](http://localhost:3000)
   - L'API des tâches est accessible sur [http://localhost:3000/tasks](http://localhost:3000/tasks)

---

### Étape 3 : Démarrer le Frontend Angular

1. Ouvrez un second terminal et naviguez dans le dossier `frontend` :
   ```bash
   cd frontend
   ```
2. Installez les dépendances si ce n'est pas déjà fait :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement Angular :
   ```bash
   npm start
   ```
4. Ouvrez votre navigateur sur : [http://localhost:4200](http://localhost:4200)

---

## 🧪 Tests

### Tests unitaires Frontend (Angular / Vitest)
Pour exécuter la suite de tests unitaires du frontend :
```bash
cd frontend
npm test -- --watch=false
```

### Build de production Frontend
Pour générer les fichiers de production optimisés :
```bash
cd frontend
npm run build
```
Les fichiers générés se trouveront dans le dossier `frontend/dist/frontend`.
# Tp2-Angular
