## Dictionnaire de données - Search-service

| Entité      | Attribut   | Type de données | Longueur | Contraintes           | Description                                            | Exemples                               |
| ----------- | ---------- | --------------- | -------- | --------------------- | ------------------------------------------------------ | -------------------------------------- |
| SearchQuery | id         | UUID            |          | Primary Key, Not Null | Identifiant unique de la requête de recherche          | `9fdde00e-d349-47db-944d-5f4c4a5e0b25` |
|             | query_text | TEXT            |          | Not Null              | Texte de la requête                                    | `Séances du vendredi`                  |
|             | user_id    | UUID            |          | Foreign Key           | Identifiant de l'utilisateur ayant initié la recherche | `550e8400-e29b-41d4-a716-446655440000` |
|             | created_at | TIMESTAMP       |          | Not Null              | Date et heure de la requête                            | `2024-09-13 10:30:00`                  |

[🔙 Retour à la Table des matières](../../documentation/ReadMe.md)
