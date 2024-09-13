## Présentation de la Qualité du Code dans Simplo-Ciné

Dans le cadre du projet Simplo-Ciné, nous avons mis en place une série de pratiques et d'outils visant à garantir la qualité, la lisibilité, et la maintenabilité du code. L'objectif est de s'assurer que chaque contribution au projet respecte des normes strictes de qualité et que le code reste cohérent et fiable tout au long du cycle de développement. Voici un aperçu des outils et processus utilisés pour atteindre cet objectif.

## Outils et Processus

### 1. **ESLint**

ESLint est utilisé pour garantir que le code respecte les bonnes pratiques de JavaScript et les conventions de codage définies.

- **Intégration CI** : ESLint est intégré dans notre pipeline CI pour s'assurer que chaque commit ou pull request est conforme aux standards de qualité. Les commits non conformes sont automatiquement rejetés, ce qui garantit que seul du code propre et conforme est fusionné dans le codebase.

### Installation

```sh
npm install --save-dev eslint
```

1. Créer un fichier **.lintstagedrc** pour corriger automatiquement les erreurs avant chaque commit :

```sh
{
  "*.js": [
    "eslint --fix"
  ]
}
```

### 2. **Prettier**

Prettier est utilisé en conjonction avec ESLint pour assurer un formatage cohérent du code.

### Installation

```sh
npm install --save-dev prettier
```

1. Compléter le fichier **.lintstagedrc** pour formater les fichiers avant chaque commit :

```sh
{
  "*.(js|ts|tsx|html|css)": [
    "prettier --write"
   ],
}
```

- **Intégration avec ESLint** : Prettier est intégré dans le workflow ESLint, garantissant que le code n'est pas seulement fonctionnel, mais aussi correctement formaté selon les standards de l'équipe. Cela permet d'éviter les discussions sur le style de code lors des revues de code.

### 3. **SonarCloud**

SonarCloud est notre outil de référence pour l'analyse approfondie de la qualité du code.

- **Analyse de code** : À chaque push, SonarCloud analyse le code pour détecter les bugs, les vulnérabilités, les "code smells", et les duplications de code.
- **Tableaux de bord** : Les résultats de SonarCloud sont accessibles via des tableaux de bord en ligne, des alertes et des liens accessibles des logs, permettant de suivre la qualité du code en continu et de prioriser les actions correctives.  
  SonarCloud intègre également des indicateurs de qualité qui aident à maintenir un haut niveau de rigueur dans le développement.

### Installation

1. Créer un compte SonarCloud et lier notre projet

   1. Inscription : compte GitHub.
   2. Lier le projet à SonarCloud.

2. Configurer SonarCloud dans notre projet

SonarCloud nécessite l’ajout d’une configuration spécifique dans notre projet pour exécuter l’analyse statique. Il y a deux principales méthodes : via un fichier de configuration (sonar-project.properties) ou directement via notre pipeline CI.

**Option 1** : Configuration via sonar-project.properties

1. Ajouter le fichier sonar-project.properties :
   Création du fichier **sonar-project.properties** à la racine de notre projet avec le contenu suivant :

```sh
# Clé unique du projet dans SonarQube
sonar.projectKey=Florence-Martin_projet-code-quality

# Nom de votre organisation dans SonarQube
sonar.organization=florence-martin

# Répertoires contenant le code source principal du projet
# On inclut `app/components`, `app/fonts` et `pages/api`
sonar.sources=app/components,app/fonts,pages/api

# Répertoire contenant les fichiers de tests unitaires
# Les tests sont situés dans le répertoire `__tests__` sous `app`
sonar.tests=app/__tests__

# Exclusion de certains répertoires et fichiers de l'analyse
# On exclut `node_modules` pour éviter d'analyser les dépendances
sonar.exclusions=**/node_modules/**, **/*.spec.tsx

# Chemin vers le fichier de couverture de code TypeScript généré par lcov
sonar.typescript.lcov.reportPaths=coverage/lcov.info
```

**Option 1** : Intégration via le pipeline CI (recommandée)

Exemple de configuration pour GitHub Actions (.github/workflows/ci.yml):

```yml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloud:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "14"
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Run SonarCloud Scan
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        run: |
          npx sonarscanner \
            -Dsonar.projectKey=your_project_key \
            -Dsonar.organization=your_organization_name \
            -Dsonar.sources=./src \
            -Dsonar.host.url=https://sonarcloud.io \
            -Dsonar.login=$SONAR_TOKEN
```

Remplacez your_project_key et your_organization_name par les valeurs appropriées pour notre projet.

3. Ajouter le secret SONAR_TOKEN :
   • Dans les paramètres de notre dépôt GitHub, ajoutez un secret nommé SONAR_TOKEN avec la valeur de votre jeton d’autorisation SonarCloud.
   • Ce jeton peut être généré dans notre compte SonarCloud sous la section “My Account” -> “Security” -> “Generate Tokens”.

4. Exécuter l’analyse

   • Via le pipeline CI : À chaque push ou pull request, l’analyse SonarCloud sera automatiquement exécutée.
   • Manuellement : Nous pouvons également exécuter l’analyse manuellement avec la commande suivante dans notre terminal, si nous utilisons le fichier **sonar-project.properties** :

```sh
npx sonarscanner
```

5. Vérification des résultats

   • Accéder à SonarCloud :  
   Via :

   - lien dans les logs du workflow
   - alerte
   - vérifier les résultats de l’analyse directement sur le tableau de bord de SonarCloud

### 4. **Husky + Lint-Staged**

Husky et Lint-Staged sont utilisés pour renforcer les bonnes pratiques dès la phase de développement locale.

- **Husky** : Husky permet de gérer les hooks Git. Un hook `pre-commit` est configuré pour exécuter automatiquement ESLint, Prettier, et les tests unitaires avant d'autoriser un commit. Cela empêche les développeurs de commettre du code qui ne respecte pas les normes de qualité définies.

- **Lint-Staged** : Lint-Staged optimise ce processus en exécutant ESLint et Prettier uniquement sur les fichiers modifiés, ce qui accélère considérablement le processus de validation des commits sans compromettre la qualité.

### Installation

1. Installer Husky comme dépendance de développement :

```sh
 npm install husky --save-dev
```

2. Configurer Husky dans votre projet :

```sh
npx husky-init
npm install
```

3. Ajouter un hook Git pre-commit pour exécuter ESLint et Prettier :

```sh
npx husky add .husky/pre-commit "npx lint-staged"
```

4. Configurer lint-staged dans le package.json :

```sh
  "lint-staged": {
    "*.(js|ts|tsx|html|css)": [
      "prettier --write"
    ],
    "*.js": [
      "eslint --fix"
    ]
  },
```

5. Ajouter un script test dans votre package.json. Voici un exemple de configuration basique :

```sh
"scripts": {
  "test": "echo \"No test specified\" && exit 0"
}
```

Ce script de test est simplement un placeholder. Vous devrez le remplacer par une commande qui exécute réellement nos tests unitaires, comme :

```sh
"scripts": {
  "test": "jest"
}
```

6. Vérifier les Tests Avant un git push : Ajoutez un hook pre-push pour s’assurer que les tests passent avant d’envoyer du code sur le dépôt distant :

```sh
npx husky add .husky/pre-push "npm run test"
```

7. Testez en effectuant un commit pour vérifier que le hook pre-commit fonctionne :

```sh
git add .
git commit -m "Test Husky pre-commit hook"
```

## Conclusion

En combinant ces outils et pratiques, nous avons mis en place une infrastructure robuste pour la qualité du code dans Simplo-Ciné. Ce système assure que chaque ligne de code respecte des standards élevés de qualité et que les erreurs sont détectées et corrigées tôt dans le processus de développement. L'intégration de ces outils dans notre pipeline CI/CD garantit que ces pratiques sont appliquées de manière cohérente et automatisée, contribuant ainsi à la stabilité et à la maintenabilité de notre projet.
[🔙 Retour à la Table des matières](../../documentation/ReadMe.md)
