const connection = require('./connection');

require('../models/UsuariosModel');
require('../models/CategoriasModel');
require('../models/ProdutosModel');

connection.sync({force: true});