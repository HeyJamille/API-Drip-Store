const { DataTypes } = require('sequelize');
const connection = require('../database/connection');

ImagensProdutoModel.init ({
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
  enable: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: 0, 
  },
  path: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize: connection,
  tableName: "ImagensProduto"
})