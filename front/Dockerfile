# Étape 1 : Builder
# Utilisation d'une image légère de Node.js pour builder l'application
FROM node:18-alpine AS build

# Définition le répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json et package-lock.json uniquement
COPY package*.json ./

# Installe uniquement les dépendances nécessaires pour la production (éviter devDependencies)
RUN npm install --production --ignore-scripts

# Copie tout le code source dans le conteneur
COPY . .

# Construit l'application Next.js pour la production
RUN npm run build

# Étape 2 : Production
# Utilisation une image encore plus légère pour servir l'application
FROM node:18-alpine

# Création un répertoire de travail
WORKDIR /app

# Copie uniquement les fichiers nécessaires pour exécuter l'application
COPY --from=build /app .

# Installe les modules de production 
RUN npm ci --only=production --ignore-scripts

# Expose le port utilisé par l'application
EXPOSE 3000

# Commande pour démarrer l'application en production
CMD ["npm", "start"]
