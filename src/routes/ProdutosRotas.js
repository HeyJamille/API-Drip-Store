const express = require('express');
const ProdutosController = require('../controllers/ProdutosController'); 
const ProdutosRotas = express.Router();

const produtosController = new ProdutosController();

// Rotas
ProdutosRotas.get('/produtos', produtosController.listar);
ProdutosRotas.post('/produtos', produtosController.criar);
ProdutosRotas.delete('/produtos/:id', produtosController.deletar);
ProdutosRotas.put('/produtos/:id', produtosController.atualizar);

module.exports = ProdutosRotas;
