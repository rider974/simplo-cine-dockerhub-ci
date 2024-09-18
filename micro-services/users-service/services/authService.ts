import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export class AuthService {
  // Hachage de mot de passe
  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Nombre de rounds pour bcrypt (augmente la sécurité)
    return await bcrypt.hash(password, saltRounds);
  }

  // Vérification du mot de passe (login)
  public async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
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
