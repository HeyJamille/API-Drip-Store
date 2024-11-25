const { DataTypes, Model } = require('sequelize');
const connection = require('../database/connection');

class UsuariosModel extends Model {}

UsuariosModel.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,  // Define como chave primária
      autoIncrement: true,  // Auto incremento para o ID
    },
    firstname: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,  // Garante que o email seja único
      validate: {
        isEmail: true,  // Validação de formato de email
      },
    },
    password: {
      type: DataTypes.STRING(255), // Tamanho aumentado para suportar hashes
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'Usuarios',
    timestamps: true,  // Cria automaticamente as colunas `createdAt` e `updatedAt`
  }
);

module.exports = UsuariosModel;
