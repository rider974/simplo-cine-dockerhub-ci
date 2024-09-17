// Ce contrôleur gère l’authentification des administrateurs, y compris la connexion et la gestion des tokens.
import { Request, Response } from "express";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const { token, user } = await authService.login(email, password);
      res.status(200).json({ token, user });
    } catch (error) {
      const err = error as Error; // Assertion explicite
      res.status(500).json({ message: err.message });
    }
  }

  public async verifyToken(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    try {
      const decoded = authService.verifyToken(token);
      return res.status(200).json({ decoded });
    } catch (error) {
      return res.status(401).json({ message: (error as Error).message });
    }
  }

  // Ajoutez une méthode de registre si nécessaire
}
