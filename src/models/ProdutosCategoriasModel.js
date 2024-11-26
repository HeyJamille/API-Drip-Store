const { DataTypes } = require('sequelize')
const connection = require('../database/connection');

ProdutosModel.init ({
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProdutosModel,
      key: 'id'
    }
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CategoriasModel,
      key: 'id'
    }
  }
}, {
  sequelize: connection,
  tableName: "ProdutosCategorias"
})

