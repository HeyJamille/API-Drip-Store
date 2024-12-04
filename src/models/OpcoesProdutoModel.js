const pool = require('../database/connection'); // Certifique-se de que a conexão está configurada corretamente.

const OpcoesProdutoModel = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS OpcoesProduto (
      id SERIAL PRIMARY KEY, -- SERIAL para autoincremento no PostgreSQL
      product_id INTEGER NOT NULL,
      title VARCHAR(100) NOT NULL,
      shape VARCHAR(50), -- Forma armazenada como string
      radius INTEGER CHECK (radius >= 0), -- Validação para valores positivos
      type VARCHAR(50), -- Tipo armazenado como string
      values VARCHAR(100) NOT NULL,
      CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES produtos(id) ON DELETE CASCADE
    );
  `;

  try {
    const client = await pool.connect(); // Conecta ao banco de dados
    await client.query(query); // Executa o comando SQL
    console.log('Tabela "OpcoesProduto" criada com sucesso!');
    client.release(); // Libera a conexão
  } catch (error) {
    console.error('Erro ao criar tabela:', error.message || error);
  }
};

OpcoesProdutoModel();
