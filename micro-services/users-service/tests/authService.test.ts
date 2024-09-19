// tester les méthodes spécifiques à authService, comme login et verifyToken.
import { AuthService } from "../services/authService";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("../models/user"); // Mock du modèle User
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Auth Service", () => {
  const authService = new AuthService();

  it("should login a user and return a token", async () => {
    const mockUser = {
      id: 1,
      email: "admin@example.com",
      password: "hashedpassword",
      role: "admin",
    };

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mockToken");

    const result = await authService.login("admin@example.com", "password");

    expect(result).toHaveProperty("token");
    expect(result.token).toBe("mockToken");
    expect(result.user).toEqual(mockUser);
  });

  it("should throw an error for invalid credentials", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      authService.login("wrong@example.com", "wrongpassword")
    ).rejects.toThrow("User not found");
  });

  it("should verify a valid token", () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: 1, role: "admin" });

    const result = authService.verifyToken("mockToken");

    expect(result).toEqual({ id: 1, role: "admin" });
  });

  it("should throw an error for an invalid token", () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    expect(() => authService.verifyToken("invalidToken")).toThrow(
      "Invalid token"
    );
  });
});
