const knex = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const emailExiste = await knex('usuarios').where({ email }).first();

    if (emailExiste) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const senhaCriptrografada = await bcrypt.hash(senha, 10);

    const [usuario] = await knex('usuarios').insert({
      nome,
      email,
      senha: senhaCriptrografada,
    }).returning('*');

    if (!usuario) {
      return res.status(400).json('O usuário não foi cadastrado');
    }

    return res.status(200).json(usuario);

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  cadastrarUsuario,
};
