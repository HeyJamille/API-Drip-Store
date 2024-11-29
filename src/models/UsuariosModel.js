const pool = require('../database/connection'); // Certifique-se de que a conexão está configurada corretamente.

const UsuariosModel = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Usuarios (
      id SERIAL PRIMARY KEY, -- SERIAL para autoincremento no PostgreSQL
      firstname VARCHAR(30) NOT NULL,
      surname VARCHAR(30) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  /*
  try {
    const client = await pool.connect(); // Conecta ao banco de dados
    await client.query(query); // Executa o comando SQL
    console.log('Tabela "Usuarios" criada com sucesso!');
    client.release(); // Libera a conexão
  } catch (error) {
    console.error('Erro ao criar tabela:', error.message || error);
  }
  */
};

UsuariosModel();
