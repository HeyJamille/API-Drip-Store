const supabase = require('../database/supabaseClient');  // Importa o cliente do Supabase

class ImagensProdutoController {
  // Listar todos as imagens de produto
  async listar(request, response) {
    try {
      const { data: imagensProduto, error } = await supabase
        .from('imagensproduto')
        .select('*');

      if (error) {
        throw error;
      }

      return response.json(imagensProduto);  // Retorna os dados das imagens de produto
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar imagensProduto', error: error.message });
    }
  }

  // Criar uma nova imagens de produto
  async criar(request, response) {
    try {
      const { product_id, enabled, path } = request.body;
        
      // Insere os dados no banco
      const { data: imagensProduto, error } = await supabase
        .from('imagensproduto')
        .insert([{
          product_id, 
          enabled, 
          path
        }])
        .select('*'); // Retorna os dados inseridos
    
      if (error) {
        throw error;
      }
    
      return response.status(201).json({
        message: "Imagem de produto cadastrada com sucesso",
        data: imagensProduto[0], // Retorna a imagem de produto criada
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao cadastrar imagem de produto',
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
        .from('imagensproduto')
        .update(body)
        .eq('id', id)
        .select('*'); // Retorna os dados atualizados
  
      if (error) {
        throw error;
      }
  
      if (!data || data.length === 0) {
        return response.status(404).json({ message: "Imagem de produto não encontrada" });
      }
  
      return response.json({
        message: "Imagem de produto atualizada com sucesso",
        data: data[0], // Retorna o Produto atualizado
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao atualizar a Imagem de produto',
        error: error.message,
      });
    }
  }
  
  // Deletar um Produto
  async deletar(request, response) {
    try {
      const id = request.params.id;
  
      const { data, error } = await supabase
        .from('imagensproduto')
        .delete()
        .eq('id', id)
        .select('*'); // Retorna os dados deletados
  
      if (error) {
        throw error;
      }
  
      if (!data || data.length === 0) {
        return response.status(404).json({ message: "Imagem de produto não encontrado" });
      }
  
      return response.json({
        message: "Imagem de produto removido com sucesso",
        data: data[0], // Retorna o Produto removido
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao remover Imagem de produto',
        error: error.message,
      });
    }
  }  
}

module.exports = ImagensProdutoController;
