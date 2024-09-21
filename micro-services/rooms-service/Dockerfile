# Utilisation une image légère de Node.js basée sur Alpine
FROM node:18-alpine

# Crée le répertoire de travail pour l'application
WORKDIR /usr/src/app

# Copie uniquement les fichiers package.json et package-lock.json pour optimiser le cache Docker
COPY package*.json ./

# Installe les dépendances en utilisant 'npm ci' pour une installation plus rapide et fiable
RUN npm ci --only=production

# Copie le reste des fichiers de l'application
COPY . .

# Expose le port de l'application
EXPOSE 3004

# Démarre l'application
CMD ["npm", "run", "start"]
