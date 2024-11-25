const express = require('express');

const RotasPublicas = require('./api/routes/RotasPublicas');
//const RotasPrivadas = require('./api/routes/RotasPrivadas');

const host = 'localhost';
const port = 3000;

const app = express();

// Correção aqui: chamando express.json() corretamente
app.use(express.json());

app.get('/', (request, response) => {
  return response.send("Hello World!");
});

// Rotas públicas
app.use(RotasPublicas);

// Rotas privadas
//app.use(RotasPrivadas);

app.listen(port, host, () => {
  console.log(`Servidor executando em http://${host}:${port}`);
});
