const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const AuthController = require('../controllers/AuthController');
const supabase = require('../database/supabaseClient'); // Conexão com o Supabase

const RotasPublicas = express.Router();

RotasPublicas.post('/login', async (request, response) => {
  const body = request.body;
  const auth = new AuthController();
  
  // Busca o usuário no Supabase com o email fornecido
  const { data: usuario, error } = await supabase
    .from('usuarios') // Nome da tabela no Supabase
    .select('*')
    .eq('email', body.email)
    .single(); // Busca apenas um usuário

  if (error || !usuario) {
    return response.status(400).json({
      message: "Usuário não encontrado."
    });
  }

  // Compara a senha fornecida com a senha criptografada no banco de dados
  const senhaValida = await bcrypt.compare(body.password, usuario.password); // Compara a senha usando bcrypt

  if (!senhaValida) {
    return response.status(400).json({
      message: "Senha inválida."
    });
  }

  // Se a senha for válida, cria o token
  const dataToken = {
    id: usuario.id,
    email: usuario.email,
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // expira em 1 hora
  };

  const token = jwt.sign(dataToken, process.env.APP_KEY_TOKEN);
  
  return response.json({
    data: {
      id: usuario.id,
      email: usuario.email,
      firstname: usuario.firstname,
      surname: usuario.surname
    },
    token: token
  });
});

module.exports = RotasPublicas;
