const MD5 = require('crypto-js/md5');
const ProdutosModel = require('../models/ProdutosModel');

class ProdutosController {
  // Listar Produtos com suporte a filtros e paginação
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
      const Produtos = await ProdutosModel.findAll({
        where: filtros,
        limit: itensPorPagina,
        offset: offset,
        attributes: atributos,
      });

      return response.json(Produtos);
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar Produtos', error });
    }
  }

  // Criar uma novo Produto
  async criar(request, response) {
    try {
      const body = request.body;
      const novoProduto = await ProdutosModel.create(body);

      return response.status(201).json({
        message: "Produto criada com sucesso",
        data: novoProduto
      });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar Produto', error });
    }
  }

  // Atualizar uma Produto existente
  async atualizar(request, response) {
    try {
      const id = request.params.id;
      const body = request.body;
      const Produto = await ProdutosModel.findByPk(id);

      if (!Produto) {
        return response.status(404).json({ message: 'Produto não encontrada' });
      }

      await Produto.update(body);
      return response.json({
        message: "Produto atualizada com sucesso",
        data: Produto
      });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar Produto', error });
    }
  }

  // Deletar uma Produto
  async deletar(request, response) {
    try {
      const id = request.params.id;
      const Produto = await ProdutosModel.findByPk(id);

      if (!Produto) {
        return response.status(404).json({ message: 'Produto não encontrada' });
      }

      await Produto.destroy();
      return response.json({ message: "Produto removida com sucesso" });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao deletar Produto', error });
    }
  }
}

module.exports = ProdutosController;