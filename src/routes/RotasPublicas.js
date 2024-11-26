const express = require('express');
const jwt = require('jsonwebtoken');
const MD5 = require('crypto-js/md5');
require('dotenv').config();
const AuthController = require('../controllers/AuthController');

const RotasPublicas = express.Router();

RotasPublicas.post('/login', async (request, response) => {
  const body = request.body;
  const auth = new AuthController();
  
  // Criptografa a senha fornecida pelo usuário para comparação
  const senhaCriptografada = MD5(body.password).toString();
  
  // Busca o usuário no banco de dados com o email fornecido
  const dados = await auth.login(body.email, senhaCriptografada);
  
  if (dados) {
    const dataToken = {
      id: dados.id,
      email: dados.email,
      password: senhaCriptografada, // Use 'senhaCriptografada' aqui
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // expira em 1 hora
    };

    const token = jwt.sign(dataToken, process.env.APP_KEY_TOKEN);
    
    return response.json({
      data: dados,
      token: token
    });
  }
  
  return response.json({
    message: "Usuário ou senha incorretos."
  });
});

module.exports = RotasPublicas;
