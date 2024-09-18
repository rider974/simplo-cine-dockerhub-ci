import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Charger les variables d'environnement depuis .env
dotenv.config();

// Configuration de Sequelize avec les variables d'environnement
const sequelize = new Sequelize(
  process.env.DB_NAME || "users_db",
  process.env.DB_USER || "user",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
  }
);

// Tester la connexion à la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie !");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données :", err);
  });

export { sequelize };
