## Dictionnaire de données - Users-service

| Entité | Attribut      | Type de données | Longueur | Contraintes           | Description                                      | Exemples                               |
| ------ | ------------- | --------------- | -------- | --------------------- | ------------------------------------------------ | -------------------------------------- |
| User   | id            | UUID            |          | Primary Key, Not Null | Identifiant unique de l'utilisateur              | `550e8400-e29b-41d4-a716-446655440000` |
|        | username      | VARCHAR         | 100      | Not Null, Unique      | Nom d'utilisateur                                | `john_doe`                             |
|        | password_hash | VARCHAR         | 255      | Not Null              | Mot de passe haché                               | `hashed_password`                      |
|        | role          | VARCHAR         | 50       | Not Null              | Rôle de l'utilisateur (e.g., `admin`, `visitor`) | `admin`                                |
|        | created_at    | TIMESTAMP       |          | Not Null              | Date de création de l'utilisateur                | `2024-09-13 10:00:00`                  |
|        | last_login    | TIMESTAMP       |          |                       | Date et heure de la dernière connexion           | `2024-09-13 15:00:00`                  |

[🔙 Retour à la Table des matières](../../documentation/ReadMe.md)
