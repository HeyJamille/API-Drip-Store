const supabase = require('../database/supabaseClient');  // Importa o cliente do Supabase

class OpcoesProdutosController {
  // Listar todos as opções de produto
  async listar(request, response) {
    try {
      const { data: produtos, error } = await supabase
        .from('opcoesproduto')
        .select('*'); 
  
      if (error) {
        throw error;
      }

      return response.json(produtos);  // Retorna os dados
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar opções de produtos', error: error.message });
    }
  }

  // Criar um novo Produto
  async criar(request, response) {
    try {
      const { product_id, title, shape, radius, type, values } = request.body;
        
      // Insere os dados no banco
      const { data: opcoesproduto, error } = await supabase
        .from('opcoesproduto')
        .insert([{
          product_id, 
          title, 
          shape, 
          radius, 
          type, 
          values
        }])
        .select('*'); // Retorna os dados inseridos
    
      if (error) {
        throw error;
      }
    
      return response.status(201).json({
        message: "Opção de produto cadastrada com sucesso",
        data: opcoesproduto[0], // Retorna a opção de produto criada 
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao cadastrar opção de produto',
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
        .from('opcoesproduto')
        .update(body)
        .eq('id', id)
        .select('*'); // Retorna os dados atualizados
  
      if (error) {
        throw error;
      }
  
      if (!data || data.length === 0) {
        return response.status(404).json({ message: "Opção de produto não encontrada" });
      }
  
      return response.json({
        message: "Opção de produto atualizada com sucesso",
        data: data[0], // Retorna o Produto atualizado
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao atualizar opção de produto ',
        error: error.message,
      });
    }
  }
  
  // Deletar um Produto
  async deletar(request, response) {
    try {
      const id = request.params.id;
  
      const { data, error } = await supabase
        .from('opcoesproduto')
        .delete()
        .eq('id', id)
        .select('*'); // Retorna os dados deletados
  
      if (error) {
        throw error;
      }
  
      if (!data || data.length === 0) {
        return response.status(404).json({ message: "Opção de produto não encontrada" });
      }
  
      return response.json({
        message: "Opção de produto removida com sucesso",
        data: data[0], // Retorna o Produto removido
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao remover opção de produto ',
        error: error.message,
      });
    }
  }  
}

module.exports = OpcoesProdutosController;
