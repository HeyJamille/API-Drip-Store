const MD5 = require('crypto-js/md5');
const CategoriasModel = require('../models/CategoriasModel');

class CategoriasController {
  // Listar categorias com suporte a filtros e paginação
  async listar(request, response) {
    try {
      const { limit = 12, page = 1, fields, use_in_menu } = request.query;

      const itensPorPagina = parseInt(limit) === -1 ? null : parseInt(limit);
      const paginaAtual = parseInt(page);
      const offset = itensPorPagina ? (paginaAtual - 1) * itensPorPagina : null;
      const atributos = fields ? fields.split(',') : null;

      // Filtros opcionais
      const filtros = {};
      if (use_in_menu) {
        filtros.use_in_menu = use_in_menu === 'true';
      }

      // Realiza a busca no banco de dados usando Sequelize
      const categorias = await CategoriasModel.findAll({
        where: filtros,
        limit: itensPorPagina,
        offset: offset,
        attributes: atributos,
      });

      return response.json(categorias);
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar categorias', error });
    }
  }

  // Criar uma nova categoria
  async criar(request, response) {
    try {
      const body = request.body;
      const novaCategoria = await CategoriasModel.create(body);

      return response.status(201).json({
        message: "Categoria criada com sucesso",
        data: novaCategoria
      });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar categoria', error });
    }
  }

  // Atualizar uma categoria existente
  async atualizar(request, response) {
    try {
      const id = request.params.id;
      const body = request.body;
      const categoria = await CategoriasModel.findByPk(id);

      if (!categoria) {
        return response.status(404).json({ message: 'Categoria não encontrada' });
      }

      await categoria.update(body);
      return response.json({
        message: "Categoria atualizada com sucesso",
        data: categoria
      });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar categoria', error });
    }
  }

  // Deletar uma categoria
  async deletar(request, response) {
    try {
      const id = request.params.id;
      const categoria = await CategoriasModel.findByPk(id);

      if (!categoria) {
        return response.status(404).json({ message: 'Categoria não encontrada' });
      }

      await categoria.destroy();
      return response.json({ message: "Categoria removida com sucesso" });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao deletar categoria', error });
    }
  }
}

module.exports = CategoriasController;