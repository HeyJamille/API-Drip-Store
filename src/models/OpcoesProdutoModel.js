/*const { DataTypes } = require('sequelize');
const connection = require('../database/connection');

OpcoesProdutoModel.init ({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProdutosModel,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING('100'),
    allowNull: true,
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'),
    allowNull: true,
    defaultValue: 'square',  
  },
  radius: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,  
  },
  type: {
    type: DataTypes.ENUM('text', 'color'),
    allowNull: true,
    defaultValue: 'text', 
  },
  values: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize: connection,
  tableName: "OpcoesProduto"
})
  */