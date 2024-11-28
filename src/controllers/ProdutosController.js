const supabase = require('../database/supabaseClient');  // Importa o cliente do Supabase

class ProdutosController {
  // Listar todos os produtos
  async listar(request, response) {
    try {
      const { data: produtos, error } = await supabase
        .from('Produtos')
        .select('*');

      if (error) {
        throw error;
      }

      return response.json(produtos);  // Retorna os dados dos produtos
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
    }
  }

  // Criar um novo Produto
  async criar(request, response) {
    try {
      const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount } = request.body;
  
      console.log( enabled, name, slug, use_in_menu, stock, description, price, price_with_discount )

      if (!enabled || !name || !slug || !use_in_menu || !stock || !description || !price || !price_with_discount) {
        return response.status(400).json({
          message: "Todos os campos (enabled, name, slug, use_in_menu, stock, description, price, price_with_discount) são obrigatórios.",
        });
      }
  
      // Insere os dados no banco
      const { data, error } = await supabase
        .from('Produtos')
        .insert([{
          enabled, 
          name, 
          slug, 
          use_in_menu, 
          stock, 
          description, 
          price, 
          price_with_discount 
        }])
        .select('*'); // Retorna os dados inseridos
  
      if (error) {
        throw error;
      }
  
      return response.status(201).json({
        message: "Produto cadastrado com sucesso",
        data: data[0], // Retorna o Produto criado
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao cadastrar Produto',
        error: error.message,
      });
    }
  }
  
  // Atualizar um Produto
  async atualizar(request, response) {
    try {
      const id = request.params.id;
      const body = request.body;

      const { data, error } = await supabase
        .from('Produtos')
        .update(body)
        .eq('id', id)
        .select('*'); // Retorna os dados atualizados
  
      if (error) {
        throw error;
      }
  
      if (!data || data.length === 0) {
        return response.status(404).json({ message: "Produto não encontrado" });
      }
  
      return response.json({
        message: "Produto atualizado com sucesso",
        data: data[0], // Retorna o Produto atualizado
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao atualizar Produto',
        error: error.message,
      });
    }
  }
  
  // Deletar um Produto
  async deletar(request, response) {
    try {
      const id = request.params.id;
  
      const { data, error } = await supabase
        .from('Produtos')
        .delete()
        .eq('id', id)
        .select('*'); // Retorna os dados deletados
  
      if (error) {
        throw error;
      }
  
      if (!data || data.length === 0) {
        return response.status(404).json({ message: "Produto não encontrado" });
      }
  
      return response.json({
        message: "Produto removido com sucesso",
        data: data[0], // Retorna o Produto removido
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao remover Produto',
        error: error.message,
      });
    }
  }  
}

module.exports = ProdutosController;
