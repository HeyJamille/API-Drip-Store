const { Pool } = require('pg');

// Configuração do Supabase
const connection = new Pool({
  host: 'aws-0-sa-east-1.pooler.supabase.com', // Seu host do banco de dados
  user: 'postgres.dhcokbzonilfikfpiaem', // Seu usuário
  password: 'WwQJZre3sX29uAVs', // Sua senha
  database: 'postgres', // Nome do banco de dados
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexões no pool
  queueLimit: 0,
});

connection.on('connect', () => {
  console.log('Conexão com o banco de dados estabelecida!');
});

connection.on('error', (err) => {
  console.error('Erro na conexão com o banco de dados:', err.message || err);
});

module.exports = connection;
