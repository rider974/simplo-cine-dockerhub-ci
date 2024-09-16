## Dictionnaire de données - Notifications-service

| Entité       | Attribut | Type de données | Longueur | Contraintes           | Description                           | Exemples                                     |
| ------------ | -------- | --------------- | -------- | --------------------- | ------------------------------------- | -------------------------------------------- |
| Notification | id       | UUID            |          | Primary Key, Not Null | Identifiant unique de la notification | `f47ac10b-58cc-4372-a567-0e02b2c3d479`       |
|              | user_id  | UUID            |          | Foreign Key, Not Null | Identifiant de l'utilisateur          | `550e8400-e29b-41d4-a716-446655440000`       |
|              | message  | TEXT            |          | Not Null              | Contenu du message de la notification | `Le programme de la semaine est disponible.` |
|              | sent_at  | TIMESTAMP       |          | Not Null              | Date et heure de l'envoi              | `2024-09-13 14:00:00`                        |

[🔙 Retour à la Table des matières](../../documentation/ReadMe.md)
