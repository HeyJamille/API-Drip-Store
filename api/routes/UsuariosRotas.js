const express = require('express');
const UsuariosController = require('../controllers/UsuariosController'); // Corrigido
const UsuariosRotas = express.Router();

const usuarioController = new UsuariosController();

// Rotas
UsuariosRotas.get('/usuarios', usuarioController.listar);
UsuariosRotas.post('/usuarios', usuarioController.criar)
UsuariosRotas.delete('/usuarios/:id', usuarioController.deletar)
UsuariosRotas.put('/usuarios/:id', usuarioController.atualizar)

module.exports = UsuariosRotas;
