## Dictionnaire de données - Rooms-service

| Entité | Attribut     | Type de données | Longueur | Contraintes            | Description                    | Exemples                               |
| ------ | ------------ | --------------- | -------- | ---------------------- | ------------------------------ | -------------------------------------- |
| Room   | id           | UUID            |          | Primary Key, Not Null  | Identifiant unique de la salle | `3c4a6bc7-46f1-4c28-9f0d-90780c047b00` |
|        | name         | VARCHAR         | 100      | Not Null               | Nom de la salle                | `Salle 1`                              |
|        | capacity     | INTEGER         |          | Not Null               | Capacité maximale de la salle  | `100`                                  |
|        | is_available | BOOLEAN         |          | Not Null, Default True | Disponibilité de la salle      | `True`                                 |

[🔙 Retour à la Table des matières](../../documentation/ReadMe.md)
