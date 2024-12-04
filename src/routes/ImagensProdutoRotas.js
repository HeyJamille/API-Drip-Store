const express = require('express');
const ImagensProdutoController = require('../controllers/ImagensProdutoController'); 
const ImagensProdutoRotas = express.Router();

const imagensProdutoController = new ImagensProdutoController();

// Rotas
ImagensProdutoRotas.get('/imagensProduto', imagensProdutoController.listar);
ImagensProdutoRotas.post('/imagensProduto', imagensProdutoController.criar);
ImagensProdutoRotas.delete('/imagensProduto/:id', imagensProdutoController.deletar);
ImagensProdutoRotas.put('/imagensProduto/:id', imagensProdutoController.atualizar);

module.exports = ImagensProdutoRotas;
