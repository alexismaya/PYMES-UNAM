const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pymes_unam_test1', 'root', 'AMayalordtr1ym3sh1t', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
