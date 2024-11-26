const { DataTypes, Model } = require('sequelize'); // Importando Model junto com DataTypes
const connection = require('../database/connection');

class ProdutosModel extends Model {}

ProdutosModel.init({
  produto_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,  // Define como chave primária
    autoIncrement: true,  // Auto incremento para o ID
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  use_in_menu: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(255), // Ajustado para 255, pois "50" pode ser curto para descrições
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price_with_discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  sequelize: connection,
  tableName: 'Produtos',  // Nome da tabela no banco de dados
  timestamps: true,     
});

module.exports = ProdutosModel;
