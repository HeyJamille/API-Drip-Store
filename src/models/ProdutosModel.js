const pool = require('../database/connection'); // Certifique-se de que a conexão está configurada corretamente.

const ProdutosModel = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Produtos (
      id SERIAL PRIMARY KEY, -- SERIAL para autoincremento no PostgreSQL
      enabled BOOLEAN,
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) NOT NULL UNIQUE,
      use_in_menu  BOOLEAN,
      stock INTEGER,
      description VARCHAR(100),
      price FLOAT NOT NULL,
      price_with_discount FLOAT NOT NULL,
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

ProdutosModel();
