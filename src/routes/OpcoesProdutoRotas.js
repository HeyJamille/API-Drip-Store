const express = require('express');
const OpcoesProdutoController = require('../controllers/OpcoesProdutoController'); 
const OpcoesProdutoRotas = express.Router();

const opcoesProdutoController = new OpcoesProdutoController();

// Rotas
OpcoesProdutoRotas.get('/opcoesProdutos', opcoesProdutoController.listar);
OpcoesProdutoRotas.post('/opcoesProdutos', opcoesProdutoController.criar);
OpcoesProdutoRotas.delete('/opcoesProdutos/:id', opcoesProdutoController.deletar);
OpcoesProdutoRotas.put('/opcoesProdutos/:id', opcoesProdutoController.atualizar);

module.exports = OpcoesProdutoRotas;
