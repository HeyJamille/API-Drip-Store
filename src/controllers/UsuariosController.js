const MD5 = require('crypto-js/md5');
const UsuariosModel = require('../models/UsuariosModel');

class UsuariosController {
  // Listar todos os usuários
  async listar(request, response) {
    try {
      const usuarios = await UsuariosModel.findAll();
      return response.json(usuarios);  // Retorna os dados dos usuários
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
  }

  // Criar um novo usuário
  async criar(request, response) {
    try {
      const body = request.body;
      const password = MD5(body.password).toString();
      body.password = password;
      const novoUsuario = await UsuariosModel.create(body);
      
      return response.status(201).json({
        message: "Usuário cadastrado com sucesso",
        data: novoUsuario,
      });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao cadastrar usuário', error });
    }
  }

  // Atualizar um usuário
  async atualizar(request, response) {
    try {
      const id = request.params.id;
      const body = request.body;
      
      // Atualiza o usuário com base no ID
      const [atualizado] = await UsuariosModel.update(body, { where: { user_id: id } });
      
      if (atualizado) {
        const usuarioAtualizado = await UsuariosModel.findByPk(id);
        return response.json({
          message: "Usuário atualizado com sucesso",
          data: usuarioAtualizado,
        });
      } else {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
  }

  // Deletar um usuário
  async deletar(request, response) {
    try {
      const id = request.params.id;
      const deletado = await UsuariosModel.destroy({ where: { user_id: id } });
      
      if (deletado) {
        return response.json({ message: "Usuário removido com sucesso" });
      } else {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao remover usuário', error });
    }
  }
}

module.exports = UsuariosController;
