const { Sequelize } = require("sequelize");
const mysql = require('mysql2'); // Importando o mysql2 corretamente

const connection = new Sequelize({
  dialect: 'mysql',
  database: 'ProjetoGT',
  host: 'localhost',
  username: 'root',
  password: '1212',
  port: 3306
});

module.exports = connection;