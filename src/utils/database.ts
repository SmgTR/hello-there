import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME || 'i-hate-sand', 'root', process.env.DB_PASS, {
  dialect: 'mysql',
  host: 'localhost'
});

export default sequelize;
