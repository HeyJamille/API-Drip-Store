/*const { DataTypes, Model } = require('sequelize');
const connection = require('../database/connection');

class CategoriasModel extends Model {}

CategoriasModel.init({
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,          // Define 'categoria_id' como chave primária
    autoIncrement: true        // Define incremento automático
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
    defaultValue: false,       // Define o valor padrão como 'false'
  }
}, {
  sequelize: connection,
  tableName: 'Categorias',      // Nome da tabela no banco de dados
  timestamps: true             
});

module.exports = CategoriasModel;
*/