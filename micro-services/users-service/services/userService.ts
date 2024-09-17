import User from "../models/user";

export class UserService {
  public async getAllUsers() {
    return await User.findAll();
  }

  public async getUserById(id: string) {
    return await User.findByPk(id);
  }

  // Vous pouvez ajouter d'autres méthodes ici si nécessaire
}
