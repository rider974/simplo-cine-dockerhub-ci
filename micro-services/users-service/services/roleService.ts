import Role from "../models/role";

export class RoleService {
  // Récupérer tous les roles
  public async getAllRoles() {
    try {
      return await Role.findAll();
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des roles : " +
          (error as Error).message
      );
    }
  }

  // Récupérer un role par ID
  public async getRoleById(id: string) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role non trouvé");
      }
      return role;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération du role : " +
          (error as Error).message
      );
    }
  }

  // Créer un nouvel role
  public async createRole(data: {
    role_name: string;

  }) {
    try {
      const newRole = await Role.create(data);
      return newRole;
    } catch (error) {
      throw new Error(
        "Erreur lors de la création du role : " +
          (error as Error).message
      );
    }
  }

  // Mettre à jour un role par ID
  public async updateRole(
    id: string,
    data: {
     role_name: string;
    }
  ) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role non trouvé");
      }
      await role.update(data);
      return role;
    } catch (error) {
      throw new Error(
        "Erreur lors de la mise à jour du role : " +
          (error as Error).message
      );
    }
  }

  // Supprimer un role par ID
  public async deleteRole(id: string) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role non trouvé");
      }
      await role.destroy();
      return { message: "Role supprimé avec succès" };
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression du role : " +
          (error as Error).message
      );
    }
  }
}
