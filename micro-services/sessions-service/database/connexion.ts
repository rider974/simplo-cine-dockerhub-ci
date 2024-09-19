import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sessions_db', 'user', 'password', {
  host: 'postgres_sessions',
  dialect: 'postgres',
});

export { sequelize };
