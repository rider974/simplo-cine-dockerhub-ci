import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rooms_db', 'user', 'password', {
  host: 'postgres_rooms',
  dialect: 'postgres',
});

export { sequelize };