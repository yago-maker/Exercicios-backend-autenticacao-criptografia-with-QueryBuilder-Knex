const knex = require('../conexao');

const listarPokemons = async (req, res) => {
  try {
    const pokemons = await knex('pokemons')
      .select('id', 'nome', 'habilidades', 'apelido', 'imagem')
      .where('usuario_id', req.usuario.id);

    for (const pokemon of pokemons) {
      pokemon.habilidades = pokemon.habilidades.split(', ');
      pokemon.usuario = req.usuario.nome;
    }

    return res.json(pokemons);

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = listarPokemons;
