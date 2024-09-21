# Utilise une image de base légère de Node.js basée sur Alpine pour réduire la taille de l'image
FROM node:18-alpine

# Définie le répertoire de travail
WORKDIR /usr/src/app

# Copie uniquement package.json et package-lock.json pour permettre l'utilisation du cache Docker
COPY package*.json ./

# Installe les dépendances de production uniquement pour minimiser la taille
RUN npm ci --only=production

# Copie le reste des fichiers du projet
COPY . .

# Expose le port utilisé par le service
EXPOSE 3007

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
