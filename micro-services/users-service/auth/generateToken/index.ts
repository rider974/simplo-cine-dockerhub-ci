import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Fonction pour générer un token JWT
export function generateToken(userId: number, role: string): string {
  const payload = {
    id: userId,
    role: role,
  };

  // Générer le token avec une expiration de 1 heure
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}
