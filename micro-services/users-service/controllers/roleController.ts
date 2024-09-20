import { Request, Response } from "express";
import { RoleService } from "../services/roleService";

const roleService = new RoleService();

export class RoleController {
  // Récupérer tous les roles
  public async getAllRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles = await roleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      const err = error as Error; // Assertion explicite
      res.status(500).json({ message: err.message });
    }
  }

  // Récupérer un role par ID
  public async getRoleById(req: Request, res: Response): Promise<void> {
    try {
      const role = await roleService.getRoleById(parseInt(req?.params?.id));
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: "Role non trouvé" });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  // Créer un nouvel role
  public async createRole(req: Request, res: Response): Promise<void> {
    try {
      const newRole = await roleService.createRole(req.body);
      res.status(201).json(newRole);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  // Mettre à jour un role par ID
  public async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const updatedRole = await roleService.updateRole(req.params.id, req.body);
      if (updatedRole) {
        res.status(200).json(updatedRole);
      } else {
        res.status(404).json({ message: "Role non trouvé" });
      }
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }

  // Supprimer un role par ID
  public async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      const deletedMessage = await roleService.deleteRole(req.params.id);
      res.status(200).json(deletedMessage);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ message: err.message });
    }
  }
}
