import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export class AuthService {
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

  public verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
