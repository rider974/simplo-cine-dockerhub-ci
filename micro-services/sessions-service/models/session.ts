import { sequelize } from '../../sessions-service/database/connexion';
import Movie from '../../movies-service/models/movie';
import { Optional, Model, DataTypes } from 'sequelize';

// Interface des attributs du modèle Movie
interface SessionAttributes {
  id: number;
  movie_id: Movie;
  room_id: number;
  date: Date;
  heure_debut: string;
  heure_fin: string;
  nb_spectateurs: number;
}

// Interface pour les options de création
interface SessionCreationAttributes extends Optional<SessionAttributes, 'id'> { }

// Modèle de film
class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
  public id!: number;
  public movie_id!: Movie;
  public room_id!: number;
  public readonly date!: Date;
  public heure_debut!: string;
  public heure_fin!: string;
  public nb_spectateurs!: number;
}

Session.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'movie', // Assurez-vous que le nom du modèle référencé est correct
      key: 'id'
    }
  },
  room_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  heure_debut: {
    type: DataTypes.STRING,
    allowNull: false
  },
  heure_fin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nb_spectateurs: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize, // Instance sequelize
  modelName: 'session',
});

export default Session;