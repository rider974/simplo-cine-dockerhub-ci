# Sessions Service

## Description
Le dossier `sessions-service` contient le micro-service responsable de la gestion des sessions de cinéma pour le projet Simplo-cine. Ce service permet de créer, lire, mettre à jour et supprimer des sessions de films.

## Structure du dossier
- `config/` : Contient les fichiers de configuration.
- `controllers/` : Contient les contrôleurs qui gèrent les requêtes HTTP.
- `models/` : Contient les définitions des modèles de données.
- `routes/` : Contient les définitions des routes de l'API.
- `services/` : Contient la logique métier du micro-service.
- `src/` : Contient le code source du micro-service.
- `tests/` : Contient les tests unitaires et d'intégration.
- `Dockerfile` : Fichier pour la création de l'image Docker du micro-service.
- `README.md` : Ce fichier.


## Prérequis
- Docker
- Node.js
- NPM

## Installation
1. Cloner le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/simplo-cine.git
    ```
2. Naviguer vers le dossier `sessions-service` :
    ```bash
    cd simplo-cine/micro-services/sessions-service
    ```
3. Installer les dépendances :
    ```bash
    npm install
    ```

## Utilisation
### Démarrer le service en local
```bash
npm start
```

### Démarrer le service avec Docker
1. Construire l'image Docker :
    ```bash
    docker build -t sessions-service .
    ```
2. Démarrer le conteneur :
    ```bash
    docker run -p 3000:3000 sessions-service
    ```

## Tests
Pour exécuter les tests, utilisez la commande suivante :
```bash
npm test
```