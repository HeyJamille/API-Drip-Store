const MD5 = require('crypto-js/md5');
const supabase = require('../database/supabaseClient');  // Importa o cliente do Supabase

class UsuariosController {
  // Listar todos os usuários
  async listar(request, response) {
    try {
      const { data: usuarios, error } = await supabase
        .from('Usuarios')
        .select('*');

      if (error) {
        throw error;
      }

      return response.json(usuarios);  // Retorna os dados dos usuários
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
  }

  // Criar um novo usuário
  async criar(request, response) {
    try {
      const { firstname, surname, email, password } = request.body;
  
      if (!firstname || !surname || !email || !password) {
        return response.status(400).json({
          message: "Todos os campos (firstname, surname, email, password) são obrigatórios",
        });
      }
  
      // Criptografa a senha usando MD5 (substituir por bcrypt seria mais seguro)
      const hashedPassword = MD5(password).toString();
  
      // Insere os dados no banco
      const { data, error } = await supabase
        .from('Usuarios')
        .insert([{
          firstname,
          surname,
          email,
          password: hashedPassword, // Usa a senha criptografada
        }])
        .select('*'); // Retorna os dados inseridos
  
      if (error) {
        throw error;
      }
  
      return response.status(201).json({
        message: "Usuário cadastrado com sucesso",
        data: data[0], // Retorna o usuário criado
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao cadastrar usuário',
        error: error.message,
      });
    }
  }
  
  // Atualizar um usuário
  async atualizar(request, response) {
    try {
      const id = request.params.id;
      const body = request.body;
  
      const { data, error } = await supabase
        .from('Usuarios')
        .update(body)
        .eq('id', id)
        .select('*'); // Retorna os dados atualizados
  
      if (error) {
        throw error;
      }
  
      if (!data || data.length === 0) {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }
  
      return response.json({
        message: "Usuário atualizado com sucesso",
        data: data[0], // Retorna o usuário atualizado
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao atualizar usuário',
        error: error.message,
      });
    }
  }
  
  // Deletar um usuário
  async deletar(request, response) {
    try {
      const id = request.params.id;
  
      const { data, error } = await supabase
        .from('Usuarios')
        .delete()
        .eq('id', id)
        .select('*'); // Retorna os dados deletados
  
      if (error) {
        throw error;
      }
  
      if (!data || data.length === 0) {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }
  
      return response.json({
        message: "Usuário removido com sucesso",
        data: data[0], // Retorna o usuário removido
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro ao remover usuário',
        error: error.message,
      });
    }
  }  
}

module.exports = UsuariosController;
