import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('movies_db', 'user', 'password', {
  host: 'postgres_movies',
  dialect: 'postgres',
});

export { sequelize };
