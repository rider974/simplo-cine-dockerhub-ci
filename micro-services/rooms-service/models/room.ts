import { sequelize } from '../database/connexion';
import { Optional, Model, DataTypes } from 'sequelize';
import Session from './../../sessions-service/models/session';


// Interface des attributs du modèle Room
interface RoomAttributes {
  room_id: number;
  name: string;
  seatsNumber: number;
  available: boolean;
}

// Interface pour les options de création
interface RoomCreationAttributes extends Optional<RoomAttributes, 'room_id'> { }

// Modèle de salle
class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
  public room_id!: number;
  public name!: string;
  public seatsNumber!: number;
  public available!: boolean;
  static init: any;
}



Room.init({
  room_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seatsNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize, // Instance sequelize
  modelName: 'room',
});


export default Room;