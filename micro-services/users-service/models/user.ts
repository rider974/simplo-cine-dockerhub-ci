import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/connexion";
import Role from "./role";

// Interface des attributs du modèle User
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  created_at?: Date;
  updated_at?: Date;
}

// Interface pour les options de création
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Modèle d'utilisateur
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: Role;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  static init: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: Role,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;
