// Vérifie le token de session
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

// Fonction pour gérer la connexion des utilisateurs
export async function verifToken(req: Request, res: Response, roleRequired = "admin"): Promise<Response> {
    // Extraire le token de l'en-tête Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Accès refusé : aucun token fourni' });
    }

    try {
      // Vérifier et décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Vérifier le rôle de l'utilisateur
      if (roleRequired && req.user.role.role_name !== roleRequired) {
        return res.status(403).json({ message: 'Accès refusé : rôle insuffisant' });
        console.log(req.user.role);
      }
      return res.status(200); 
    } catch (err) {
      return res.status(400).json({ message: 'Token invalide' });
    }
  };

}
