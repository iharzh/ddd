import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  database: 'ddd',
  username: 'postgres',
  password: 'password',
});

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
  } catch (e) {
    console.log(e);
  }
};
