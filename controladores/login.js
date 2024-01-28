const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'É obrigatório informar email e senha' });
  }

  try {
    const { senha: senhaUsuario, ...usuario } = await knex('usuarios').where({ email }).first();

    if (!usuario) {
      return res.status(404).json({ message: 'Credenciais inválidas' });
    }

    const senhaCorreta = await bcrypt.compare(senha, senhaUsuario);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: '8h' });

    return res.json({
      usuario,
      token
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = login;
