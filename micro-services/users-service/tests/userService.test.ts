import { UserService } from "../services/userService";
import User from "../models/user";

jest.mock("../models/user"); // Mock du modèle User

describe("User Service", () => {
  const userService = new UserService();

  it("should return all users", async () => {
    const mockUsers = [
      { id: 1, email: "user1@example.com" },
      { id: 2, email: "user2@example.com" },
    ];

    (User.findAll as jest.Mock).mockResolvedValue(mockUsers);

    const result = await userService.getAllUsers();

    expect(result).toEqual(mockUsers);
  });

  it("should return a user by ID", async () => {
    const mockUser = { id: 1, email: "user1@example.com" };

    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const result = await userService.getUserById("1");

    expect(result).toEqual(mockUser);
  });

  it("should return null if user not found", async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(null);

    const result = await userService.getUserById("999");

    expect(result).toBeNull();
  });
});
