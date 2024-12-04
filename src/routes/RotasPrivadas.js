const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsuariosRotas = require('./UsuariosRotas');
const CategoriasRotas = require('./CategoriasRotas');
const ProdutosRotas = require('./ProdutosRotas');
const ImagensProdutoRotas = require('./ImagensProdutoRotas');
const OpcoesProdutoRotas = require('./OpcoesProdutoRotas');

const RotasPrivadas = express.Router();

// Middleware de Autenticação
RotasPrivadas.use((request, response, next) => {
  // Obtém o token do cabeçalho da requisição
  const token = request.headers.token;

  if (!token) {
    // Se o token não estiver presente, retorna erro de autorização
    return response.status(403).json({
      message: "Não autorizado. Token não fornecido."  
    });
  }

  try {
    // Verifica o token usando a chave secreta
    jwt.verify(token, process.env.APP_KEY_TOKEN);
  } catch (error) {
    // Se houver erro ao verificar o token, retorna "Não autorizado"
    return response.status(403).json({
      message: "Não autorizado. Token inválido."
    });
  }

  // Continua para a próxima rota se o token for válido
  next();
});

// Definindo as rotas privadas
RotasPrivadas.use(UsuariosRotas);  // Rota de usuários
RotasPrivadas.use(CategoriasRotas); // Rota de categorias
RotasPrivadas.use(ProdutosRotas); // Rota de produtos
RotasPrivadas.use(ImagensProdutoRotas); // Rota de produtos
RotasPrivadas.use(OpcoesProdutoRotas); // Rota de produtos

module.exports = RotasPrivadas; // Exporta as rotas privadas
