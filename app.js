const express = require('express');
const RotasPublicas = require('./src/routes/RotasPublicas');
const RotasPrivadas = require('./src/routes/RotasPrivadas');

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  return response.json("Hello, World");
});

// Rotas públicas
app.use(RotasPublicas);

// Rotas privadas
app.use(RotasPrivadas);

// Middleware para rotas não encontradas (Erro 404)
if(!RotasPublicas || RotasPrivadas) {
  app.use((request, response) => {
    response.status(404).json({
    message: 'A rota não existe.'
    });
  });
}

// Exporta o app para uso em outros arquivos
module.exports = app;