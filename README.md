# Simplo-Ciné 

Simplo-Ciné est une application de gestion de séances de cinéma, développée en architecture micro-services. Elle permet au gérant de planifier les séances de films dans deux salles de cinéma, en suivant des règles de gestion spécifiques. Cette application comprend également une interface publique pour les visiteurs afin de consulter les séances disponibles.

## Structure du projet

La structure du projet est organisée comme suit :

### Répertoires

- [**api/**](./api/ReadMe.md) : Contient les configurations pour l’API Gateway Nginx qui agit en tant que point d’entrée unique pour toutes les requêtes vers les différents micro-services. Ce répertoire inclut les fichiers de configuration Nginx nécessaires pour le routage, le load balancing, et la gestion des certificats SSL.

- [**ci-cd/**](./ci-cd/ReadMe.md) : Contient les configurations pour l'intégration et le déploiement continus (CI/CD). Le sous-répertoire `.github/workflows/` contient les workflows GitHub Actions pour l'automatisation des tests, du formatage du code, et du déploiement.

- [**documentation/**](./documentation/ReadMe.md) : Ce répertoire contient la documentation technique et fonctionnelle du projet.

- [**front/**](./front/README.md) : Contient le code source de l'interface utilisateur de l'application (frontend).

- [**global-tests/**](./global-tests/ReadMe.md) : Répertoire dédié aux tests globaux qui couvrent l'ensemble du système.

- [**micro-services/**](./micro-services/ReadMe.md): Contient les différents micro-services de l'application, tels que `movies-service`, `sessions-service`, `rooms-service`, etc.

- [**monitoring/**](./monitoring/ReadMe.md) : Contient les configurations pour le monitoring de l'application et de l'infrastructure, par exemple avec Prometheus et Grafana.

- [**quality-config/**](./quality-config/ReadMe.md) : Contient les configurations liées à la qualité du code, comme les configurations pour Prettier, ESLint, SonarCloud et Husky.

- [**security/**](./security/ReadMe.md) : Contient les configurations de sécurité, comme la gestion des clés, les certificats, et les politiques de sécurité.

- [**docker-compose.yml**](./docker-compose.yml): Fichier de configuration Docker Compose pour orchestrer les différents conteneurs Docker du projet.

- **.gitignore** : Fichier listant les fichiers et répertoires à ignorer par Git.

- **README.md** : Fichier de documentation que vous lisez actuellement.

## Fonctionnalités principales

### Gérant de la salle

- **Gestion des films** : Ajout, modification et suppression des films.
- **Planification des séances** : Planification hebdomadaire des séances avec des règles strictes de programmation.
- **Gestion des salles** : Gestion des deux salles disponibles, y compris leur capacité et leur disponibilité.

### Visiteurs

- **Consultation des séances** : Affichage des séances disponibles, filtrées par jour et par heure.

## Configuration et déploiement

### Prérequis

- Docker et Docker Compose installés
- Node.js et npm (pour le frontend)

### Lancer l'application en local

1. Clonez ce dépôt :
   ```sh
   git clone https://github.com/votre-repo/simplo-cine.git
   cd simplo-cine
   ```
2. Construisez et démarrez les conteneurs Docker :

   ```sh
   docker-compose up --build
   ```

3. Accédez à l’application :

### Workflows CI/CD

Les workflows CI/CD sont configurés dans le répertoire ci-cd/.github/workflows/. À chaque push sur le dépôt, les tests, l’analyse statique du code, et le déploiement sont automatiquement exécutés.

Tests

- Tests unitaires : Localisés dans chaque micro-service sous un répertoire tests/.

- Tests d’intégration : Situés dans le répertoire global-tests/.

- Test End-To-End : Situés dans le répertoire global-tests/.

Exécution des tests

Pour exécuter les tests unitaires, d’intégration et endToend :

```sh
// Pour les tests unitaires dans un micro-service spécifique
cd micro-services/movies-service
npm test
```

```sh
// Pour les tests d'intégration globaux
cd global-tests
npm test
```

## Monitoring

Le monitoring des performances de l’application est assuré par des outils tels que Prometheus et Grafana configurés dans le répertoire monitoring/.

## Sécurité

Le répertoire security/ contient les configurations nécessaires pour sécuriser les communications et les données dans l’application.

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une pull request avec des descriptions claires de vos modifications.
