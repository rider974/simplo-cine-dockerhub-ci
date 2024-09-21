# Utilisation une image de base légère pour Node.js
FROM node:18-alpine

# Crée le répertoire de travail pour l'application
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances en utilisant 'npm ci' pour une installation plus rapide et fiable
RUN npm ci --only=production

# Copie le reste des fichiers de l'application
COPY . .

# Expose le port de l'application
EXPOSE 3001

# Démarre l'application
CMD ["npm", "run", "start"]
