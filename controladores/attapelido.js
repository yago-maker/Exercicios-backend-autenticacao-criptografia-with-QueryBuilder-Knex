const knex = require('../conexao');

const attApelidoPokemon = async (req, res) => {
  const { apelido } = req.body;
  const { id } = req.params;

  if (!apelido && !id) {
    return res.status(400).json('É obrigatório informar ao menos um campo para atualização');
  }

  try {
    const pokemon = await knex('pokemons')
      .where({ id, usuario_id: req.usuario.id })
      .first();

    if (!pokemon) {
      return res.status(404).json({ mensagem: 'Pokemon não existe' });
    }

    await knex('pokemons')
      .where({ id, usuario_id: req.usuario.id })
      .update({ apelido });

    return res.status(204).send();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: 'Erro no servidor' });
  }
};

module.exports = attApelidoPokemon;
