// Gère l’inscription des nouveaux utilisateurs.
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/user";
import { generateToken } from "../generateToken";

// Fonction pour inscrire un nouvel utilisateur
export async function register(req: Request, res: Response): Promise<Response> {
  const { username, email, password, role } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Générer le token pour l'utilisateur inscrit
    const token = generateToken(newUser.id, newUser.role);

    return res.status(201).json({
      message: "Utilisateur inscrit avec succès",
      user: newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}
