const pool = require('../database/connection'); // Certifique-se de que a conexão está configurada corretamente.

const CategoriasModel = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Categorias (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) NOT NULL UNIQUE,
      use_in_menu  BOOLEAN
    );
  `;

  try {
    const client = await pool.connect(); // Conecta ao banco de dados
    await client.query(query); // Executa o comando SQL
    console.log('Tabela "Categorias" criada com sucesso!');
    client.release(); // Libera a conexão
  } catch (error) {
    console.error('Erro ao criar tabela:', error.message || error);
  }

};

CategoriasModel();