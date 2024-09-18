import express from "express";
import userRoutes from "../routes/userRoutes";
import authRoutes from "../routes/authRoutes";
import { sequelize } from "../database/connexion";
import User from "../models/user";
import Role from "../models/role";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger/swaggerOptions";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

// Synchronise les modèles avec la base de données (alter : true pour mettre à jour la table existante)
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la synchronisation avec la base de données:",
      error
    );
  });

export { sequelize, User, Role };

const app = express();

// Configuration CORS
app.use(cors());

// Sécurisation avec Helmet
app.use(helmet());

// Parse le JSON
app.use(express.json());

// Middleware pour servir Swagger UI
app.use("/api-users-swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Endpoint pour servir le fichier JSON de la documentation Swagger
app.get("/api-users-swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Utilisation des routes pour les utilisateurs et l'authentification
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
