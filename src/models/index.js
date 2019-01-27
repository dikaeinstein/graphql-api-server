import Sequelize from 'sequelize';
import 'dotenv/config';

const env = process.env.NODE_ENV || 'development';

const sequelize = env === 'production'
  ? new Sequelize(process.env.DATABASE_URL)
  : new Sequelize(
      process.env[`DATABASE_${env}`],
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        dialect: 'postgres',
        define: {
          underscored: true,
        },
        host: process.env.DB_HOST,
        operatorsAliases: false,
      },
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
