import { sequelize } from './../database/connexion';
import Room from '../../rooms-service/models/room';
import { Optional, Model, DataTypes } from 'sequelize';
import Movie from '../../movies-service/models/movie';

// Interface des attributs du modèle session
interface SessionAttributes {
  id: number;
  movie_id: number;
  room_id: number;
  date: Date;
  heure_debut: string;
  heure_fin: string;
  nb_spectateurs: number;
}

// Interface pour les options de création
interface SessionCreationAttributes extends Optional<SessionAttributes, 'id'> { }

// Modèle de session
class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
  public id!: number;
  public movie_id!: number;
  public room_id!: number;
  public readonly date!: Date;
  public heure_debut!: string;
  public heure_fin!: string;
  public nb_spectateurs!: number;
}

Session.belongsTo(Movie, {
  foreignKey: 'movie_id',
  as: 'movie'
});

Session.belongsTo(Room, {
  foreignKey: 'room_id',
  as: 'room'
});

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
      model: Movie,
      key: 'id'
    }
  },
  room_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Room,
      key: 'room_id'
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  heure_debut: {
    type: DataTypes.TIME,
    allowNull: false
  },
  heure_fin: {
    type: DataTypes.TIME,
    allowNull: false
  },
  nb_spectateurs: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize, // Instance sequelize
  modelName: 'session',
  underscored: true,
  timestamps: true
});

// Définir les associations
Session.belongsTo(Movie, { foreignKey: 'movie_id', as: 'movie' });
Session.belongsTo(Room, { foreignKey: 'room_id', as: 'room' });

export default Session;