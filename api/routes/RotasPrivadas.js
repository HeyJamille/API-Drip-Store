const express = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config()
//const UsuariosRotas = require('./UsuariosRotas');
//const CategoriasRotas = require('./CategoriasRotas');
//const ProdutosRotas = require("./ProdutosRotas");

const RotasPrivadas = express.Router();

// Middleware
RotasPrivadas.use((request, response, next) => {
    // VERIFICA SE TEM AUTORIZACAO OU NAO
    
    const token = request.headers.token;
    try {
        jwt.verify(token, process.env.APP_KEY_TOKEN)
    }catch(JsonWebTokenError) {
        return response.status(403).send("Não autorizado")
    }
    next();
});

//RotasPrivadas.use(UsuariosRotas);
//RotasPrivadas.use(CategoriasRotas);
//RotasPrivadas.use(ProdutosRotas);

module.exports = RotasPrivadas;
