const bcrypt = require('bcrypt'); // Certifique-se de que o pacote bcrypt está instalado
const UsuariosModel = require('./src/Models/UsuariosModel'); // Caminho correto

async function execute() {
  try {
    // Criptografar a senha com bcrypt
    const hashedPassword = await bcrypt.hash('1212', 10); // 10 é o número de salt rounds

    // Criar o usuário com a senha criptografada
    const usuario = await UsuariosModel.create({
      firstname: 'Admin',
      surname: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword // Armazena a senha criptografada no banco
    });

    console.log('Usuário criado com sucesso:', usuario);
  } catch (error) {
    console.error('Erro ao executar:', error.message || error);
  }
}

module.exports = execute;
