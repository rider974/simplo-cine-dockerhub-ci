## Dictionnaire de données - Movies-service

| Entité | Attribut          | Type de données | Longueur | Contraintes           | Description                               | Exemples                               |
| ------ | ----------------- | --------------- | -------- | --------------------- | ----------------------------------------- | -------------------------------------- |
| Movie  | id                | UUID            |          | Primary Key, Not Null | Identifiant unique du film                | `550e8400-e29b-41d4-a716-446655440000` |
|        | title             | VARCHAR         | 255      | Not Null              | Titre du film                             | `Inception`                            |
|        | description       | TEXT            |          |                       | Description du film                       | `A mind-bending thriller...`           |
|        | duration_minutes  | INTEGER         |          | Not Null              | Durée du film en minutes                  | `148`                                  |
|        | release_date      | DATE            |          | Not Null              | Date de sortie du film                    | `2010-07-16`                           |
|        | max_showing_weeks | INTEGER         |          | Default 5, Not Null   | Durée maximale de diffusion (en semaines) | `5`                                    |

[🔙 Retour à la Table des matières](../../documentation/ReadMe.md)
