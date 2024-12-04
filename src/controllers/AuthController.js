const UsuariosModel = require('../Models/UsuariosModel');

class AuthController {
  async login(email, senhaCriptografada) {
    // Busca o usuário no banco de dados pelo email e senha criptografada
    const usuario = await UsuariosModel.findOne({
      where: {
        email: email,
        password: senhaCriptografada,
      }
    });

    return usuario;  // Retorna o usuário encontrado ou null se não encontrar
  }
}

module.exports = AuthController;
