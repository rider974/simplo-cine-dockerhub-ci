import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connexion';

// Interface des attributs du modèle Movie
interface MovieAttributes {
  id: number;
  title: string;
  description?: string;
  release_date?: Date;
  duration?: number;
  created_at?: Date;
  updated_at?: Date;
}

// Interface pour les options de création
interface MovieCreationAttributes extends Optional<MovieAttributes, 'id'> {}

// Modèle de film
class Movie extends Model<MovieAttributes, MovieCreationAttributes> implements MovieAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public release_date!: Date;
  public duration!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Movie.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  release_date: {
    type: DataTypes.DATE
  },
  duration: {
    type: DataTypes.INTEGER
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  sequelize, // Instance sequelize
  modelName: 'movie',
  underscored: true, // Utilise des noms de colonnes avec des underscores
  timestamps: true, // Pour gérer les colonnes `created_at` et `updated_at`
  createdAt: 'created_at', // Nom de la colonne dans la base de données
  updatedAt: 'updated_at'  // Nom de la colonne dans la base de données
});

export default Movie;
