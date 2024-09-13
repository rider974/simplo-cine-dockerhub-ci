## Règles de gestion

# Règles de gestion

## 1. Interface de gestion sécurisée pour le gérant

- **Accès sécurisé** :

  - Le gérant doit s'authentifier pour accéder à l'interface de gestion sécurisée.
  - Après avoir terminé ses tâches, le gérant doit se déconnecter pour sécuriser l’accès à l’interface.

- **Gestion des films** :

  - Le gérant peut créer, modifier et supprimer des films dans le système.
  - Le gérant peut consulter et gérer la liste des films disponibles.
  - Le gérant peut définir la durée maximale de diffusion des films, limitée à 5 semaines.

- **Gestion des salles** :

  - Le gérant peut créer, modifier et supprimer des salles (limité à 2 salles).
  - Le gérant peut consulter et gérer la liste des salles, y compris leurs capacités et disponibilités.

- **Gestion des séances** :
  - Le gérant peut planifier, modifier et supprimer des séances de films pour chaque salle.
  - Le gérant reçoit la liste des films disponibles chaque lundi matin pour la planification des séances de la semaine à venir.
  - Le gérant doit appliquer les règles de planification des séances, telles que définies dans la section "Séances".

## 2. Interface publique pour les visiteurs

- **Accès non sécurisé** :

  - Les visiteurs peuvent accéder à l’application sans nécessiter de connexion.

- **Consultation des séances** :

  - Les visiteurs peuvent consulter les séances disponibles pour un film ou une salle spécifique.
  - Les visiteurs peuvent filtrer les séances par jour et par heure pour trouver des horaires adaptés.

- **Accès aux informations publiques** :
  - Les visiteurs ont accès à l’ensemble des informations publiques de l’application.
  - Les visiteurs n'ont pas la possibilité de modifier le contenu de l’application.

## 3. Séances

- **Durée de diffusion** :

  - Un film peut être diffusé pendant un maximum de 5 semaines.

- **Règles de planification par semaine** :

  - **Semaines 1 et 2** : Aucune restriction sur le nombre de séances par jour pour chaque film.
  - **Semaines 3 et 4** : Un maximum de 3 séances par jour est autorisé pour chaque film.
  - **Semaine 5** : Seulement 1 séance par jour est autorisée pour chaque film.

- **Intervalle entre les séances** :

  - Un minimum de 20 minutes doit être respecté entre deux séances pour permettre le nettoyage de la salle.

- **Horaires des séances** :
  - Les séances doivent être programmées entre 10h00 (au plus tôt) et 23h00 (au plus tard).

[🔙 Retour à la Table des matières](../../documentation/ReadMe.md)
