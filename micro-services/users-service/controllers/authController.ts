import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import User from "../models/user"; // Modèle utilisateur
import bcrypt from "bcryptjs";

const authService = new AuthService();

export class AuthController {
  // Méthode pour l'inscription d'un utilisateur
  public async register(req: Request, res: Response): Promise<Response> {
    const { username, email, password, role } = req.body; // Inclure role dans les données du corps de la requête

    try {
      // Vérifier si l'utilisateur existe déjà dans la base de données
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "L'utilisateur existe déjà" });
      }

      // Hachage du mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Création du nouvel utilisateur avec role, username, email et password
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role, // Assurez-vous que role est bien défini dans le corps de la requête
      });

      // Réponse de succès
      return res
        .status(201)
        .json({ message: "Utilisateur enregistré avec succès", user: newUser });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // Méthode pour la connexion d'un utilisateur
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const { token, user } = await authService.login(email, password);
      return res.status(200).json({ token, user });
    } catch (error) {
      const err = error as Error;
      return res
        .status(
          err.message === "Invalid password" || err.message === "User not found"
            ? 401
            : 500
        )
        .json({ message: err.message });
    }
  }

  // Méthode pour vérifier un token JWT
  public async verifyToken(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token non fourni" });
    }

    try {
      const decoded = authService.verifyToken(token);
      return res.status(200).json({ decoded });
    } catch (error) {
      return res.status(401).json({ message: (error as Error).message });
    }
  }
}
