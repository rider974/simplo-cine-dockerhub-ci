## Présentation de la Qualité du Code dans Simplo-Ciné

Dans le cadre du projet Simplo-Ciné, nous avons mis en place une série de pratiques et d'outils visant à garantir la qualité, la lisibilité, et la maintenabilité du code. L'objectif est de s'assurer que chaque contribution au projet respecte des normes strictes de qualité et que le code reste cohérent et fiable tout au long du cycle de développement. Voici un aperçu des outils et processus utilisés pour atteindre cet objectif.

## Outils et Processus

### 1. **ESLint**

ESLint est utilisé pour garantir que le code respecte les bonnes pratiques de JavaScript et les conventions de codage définies.

- **Intégration CI** : ESLint est intégré dans notre pipeline CI pour s'assurer que chaque commit ou pull request est conforme aux standards de qualité. Les commits non conformes sont automatiquement rejetés, ce qui garantit que seul du code propre et conforme est fusionné dans le codebase.

### 2. **Prettier**

Prettier est utilisé en conjonction avec ESLint pour assurer un formatage cohérent du code.

- **Intégration avec ESLint** : Prettier est intégré dans le workflow ESLint, garantissant que le code n'est pas seulement fonctionnel, mais aussi correctement formaté selon les standards de l'équipe. Cela permet d'éviter les discussions sur le style de code lors des revues de code.

### 3. **SonarCloud**

SonarCloud est notre outil de référence pour l'analyse approfondie de la qualité du code.

- **Analyse de code** : À chaque push, SonarCloud analyse le code pour détecter les bugs, les vulnérabilités, les "code smells", et les duplications de code.
- **Tableaux de bord** : Les résultats de SonarCloud sont accessibles via des tableaux de bord en ligne, des alertes et des liens accessibles des logs, permettant de suivre la qualité du code en continu et de prioriser les actions correctives.  
  SonarCloud intègre également des indicateurs de qualité qui aident à maintenir un haut niveau de rigueur dans le développement.

### 4. **Husky + Lint-Staged**

Husky et Lint-Staged sont utilisés pour renforcer les bonnes pratiques dès la phase de développement locale.

- **Husky** : Husky permet de gérer les hooks Git. Un hook `pre-commit` est configuré pour exécuter automatiquement ESLint, Prettier, et les tests unitaires avant d'autoriser un commit. Cela empêche les développeurs de commettre du code qui ne respecte pas les normes de qualité définies.

- **Lint-Staged** : Lint-Staged optimise ce processus en exécutant ESLint et Prettier uniquement sur les fichiers modifiés, ce qui accélère considérablement le processus de validation des commits sans compromettre la qualité.

## Conclusion

En combinant ces outils et pratiques, nous avons mis en place une infrastructure robuste pour la qualité du code dans Simplo-Ciné. Ce système assure que chaque ligne de code respecte des standards élevés de qualité et que les erreurs sont détectées et corrigées tôt dans le processus de développement. L'intégration de ces outils dans notre pipeline CI/CD garantit que ces pratiques sont appliquées de manière cohérente et automatisée, contribuant ainsi à la stabilité et à la maintenabilité de notre projet.
[🔙 Retour à la Table des matières](../../documentation/ReadMe.md)
