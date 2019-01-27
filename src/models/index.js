import Sequelize from 'sequelize';
import 'dotenv/config';

const env = process.env.NODE_ENV || 'development';

const config = {
  dialect: 'postgres',
  define: {
    underscored: true,
    underscoredAll: true,
  },
  host: process.env.DB_HOST,
  operatorsAliases: false,
};

const sequelize = env === 'production'
  ? new Sequelize(process.env.DATABASE_URL, config)
  : new Sequelize(
      process.env[`DATABASE_${env}`],
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      config,
    );

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach(modelName => {
  if(models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;
