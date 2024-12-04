const supabase = require('../database/supabaseClient');  // Importa o cliente do Supabase

class CategoriasController {
  // Lista de Categorias
  async listar(request, response) {
    try {
      const { data: categoria, error } = await supabase
        .from('categorias')
        .select('*');

      if (error) {
        throw error;
      }

      return response.json(categoria);  // Retorna os dados das categoriaa
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar categoria', error: error.message });
    }
  }

  // Criar uma nova categoria
  async criar(request, response) {
    try {
      const { name, slug, use_in_menu } = request.body;
        
      // Insere os dados no banco
      const { data: Categorias, error } = await supabase
        .from('categorias')
        .insert([{
          name, 
          slug, 
          use_in_menu 
        }])
        .select('*'); // Retorna os dados inseridos
    
      if (error) {
        throw error;
      }
    
      return response.status(201).json({
        message: "Categoria cadastrada com sucesso",
        data: Categorias[0], // Retorna o Categoria criado
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao cadastrar Categoria',
        error: error.message,
      });
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