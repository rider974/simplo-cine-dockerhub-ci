import { Sequelize } from "sequelize";

const sequelize = new Sequelize("users_db", "user", "password", {
  host: "postgres_users",
  dialect: "postgres",
});

export { sequelize };
