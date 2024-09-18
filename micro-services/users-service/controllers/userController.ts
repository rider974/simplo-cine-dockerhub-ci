// Ce contrôleur est principalement utilisé pour gérer les informations des utilisateurs
import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      const err = error as Error; // Assertion explicite
      res.status(500).json({ message: err.message });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      const err = error as Error; // Assertion explicite
      res.status(500).json({ message: err.message });
    }
  }

  // Ajoutez d'autres méthodes si nécessaire, comme la mise à jour des profils utilisateur, etc.
}
