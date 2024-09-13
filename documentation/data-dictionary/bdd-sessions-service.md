## Dictionnaire de données - Sessions-service

| Entité  | Attribut        | Type de données | Longueur | Contraintes                                                    | Description                     | Exemples                               |
| ------- | --------------- | --------------- | -------- | -------------------------------------------------------------- | ------------------------------- | -------------------------------------- |
| Session | id              | UUID            |          | Primary Key, Not Null                                          | Identifiant unique de la séance | `c1bdf50f-9624-438e-938e-58f4a88f1b9e` |
|         | movie_id        | UUID            |          | Foreign Key, Not Null                                          | Identifiant du film             | `550e8400-e29b-41d4-a716-446655440000` |
|         | room_id         | UUID            |          | Foreign Key, Not Null                                          | Identifiant de la salle         | `3c4a6bc7-46f1-4c28-9f0d-90780c047b00` |
|         | start_time      | TIMESTAMP       |          | Not Null, Check `start_time BETWEEN '10:00:00' AND '23:00:00'` | Heure de début de la séance     | `2024-09-13 15:00:00`                  |
|         | end_time        | TIMESTAMP       |          | Not Null, Check `end_time - start_time >= 20 minutes`          | Heure de fin de la séance       | `2024-09-13 17:28:00`                  |
|         | week_of_showing | INTEGER         |          | Not Null, Check `week_of_showing BETWEEN 1 AND 5`              | Semaine de diffusion du film    | `3`                                    |

[🔙 Retour à la Table des matières](../../documentation/ReadMe.md)
