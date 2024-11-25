const MD5 = require('crypto-js/md5');
const UsuariosModel = require('../models/UsuariosModel');

async function execute() {
  // Criptografar a senha com MD5
  const hashedPassword = MD5('1212').toString();  // Aqui estamos usando MD5 para criptografar a senha

  // Criar o usuário com a senha criptografada
  let usuario = await UsuariosModel.create({
    firstname: 'Admin',
    surname: 'admin',
    email: 'admin@gmail.com',
    password: hashedPassword // Armazena a senha criptografada
  });

  console.log(usuario); // Exibe o usuário criado no console
}

execute();
