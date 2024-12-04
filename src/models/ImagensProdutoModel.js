const pool = require('../database/connection'); // Certifique-se de que a conexão está configurada corretamente.

const ImagensProdutoModel = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS ImagensProduto (
      id SERIAL PRIMARY KEY, -- SERIAL para autoincremento no PostgreSQL
      product_id INTEGER NOT NULL,
      enabled BOOLEAN,
      path VARCHAR(100) NOT NULL,
      CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES produtos(id)
    );
  `;

  try {
    const client = await pool.connect(); // Conecta ao banco de dados
    await client.query(query); // Executa o comando SQL
    console.log('Tabela "ImagensProduto" criada com sucesso!');
    client.release(); // Libera a conexão
  } catch (error) {
    console.error('Erro ao criar tabela:', error.message || error);
  }
};

ImagensProdutoModel();
