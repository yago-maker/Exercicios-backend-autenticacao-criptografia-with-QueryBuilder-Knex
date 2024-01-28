const knex = require('../conexao');

const cadastrarPokemon = async (req, res) => {
  const { nome, apelido, habilidades, imagem } = req.body;

  if (!nome) {
    return res.status(400).json({ message: 'O campo nome é obrigatório' });
  }

  if (!habilidades) {
    return res.status(400).json({ mensagem: 'O campo habilidades é obrigatório' });
  }

  try {
    const novoPokemon = {
      usuario_id: req.usuario.id,
      nome,
      apelido,
      habilidades,
      imagem
    };

    const resultado = await knex('pokemons').insert(novoPokemon).returning('*');

    return res.status(201).json(resultado[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = cadastrarPokemon;
