# Utiliser une image de base légère de Node.js
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Assurez-vous que les dépendances sont installées et bcrypt est recompilé
RUN npm install --build-from-source bcrypt

# Exposer le port utilisé par le service
EXPOSE 3007

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]