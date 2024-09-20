// Contient toute la logique de l’authentification.

// authService.ts
import * as jwt from "jsonwebtoken";
import User from "../models/user";
import Role from "../models/role";
import { hashPassword, comparePassword } from "../utils/authUtils"; // Import des utilitaires

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export class AuthService {
  // Inscription : Hachage du mot de passe et création de l'utilisateur
  public async register(
    username: string,
    email: string,
    password: string,
    role: Role
  ) {
    const hashedPassword = await hashPassword(password); // Hachage via authUtils
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return newUser;
  }

  // Connexion : Comparaison du mot de passe et génération d'un token JWT
  public async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password); // Comparaison via authUtils
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return { token, user };
  }

  // Vérification d'un token JWT
  public verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
