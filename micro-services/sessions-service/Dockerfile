# Utilise une image légère de Node.js basée sur Alpine pour réduire la taille de l'image
FROM node:18-alpine

# Défini le répertoire de travail
WORKDIR /usr/src/app

# Copie uniquement package.json et package-lock.json pour optimiser le cache des dépendances
COPY package*.json ./

# Installe les dépendances en utilisant npm ci pour une installation plus rapide et fiable
RUN npm ci --only=production

# Copie le reste du code source
COPY . .

# Expose le port de l'application
EXPOSE 3006

# Démarre l'application
CMD ["npm", "run", "start"]
