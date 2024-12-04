const pool = require('../database/connection'); // Certifique-se de que o caminho está correto

// Função para criar a tabela (já existente no seu código)
const UsuariosModel = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Usuarios (
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(30) NOT NULL,
      surname VARCHAR(30) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    const client = await pool.connect();
    await client.query(query);
    console.log('Tabela "Usuarios" criada com sucesso!');
    client.release();
  } catch (error) {
    console.error('Erro ao criar tabela "Usuarios":', error.message || error);
  }
};

// Função para inserir um usuário
UsuariosModel.create = async (usuario) => {
  const query = `
    INSERT INTO Usuarios (firstname, surname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [usuario.firstname, usuario.surname, usuario.email, usuario.password];

  try {
    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();
    return result.rows[0]; // Retorna o usuário criado
  } catch (error) {
    console.error('Erro ao inserir usuário:', error.message || error);
    throw error;
  }
};

module.exports = UsuariosModel;
