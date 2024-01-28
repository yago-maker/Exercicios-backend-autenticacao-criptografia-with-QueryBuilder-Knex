const knex = require('../conexao');

const detalharPokemon = async (req, res) => {
    const { id } = req.params;

    try {
        const pokemon = await knex('pokemons')
            .select('*')
            .where({ id, usuario_id: req.usuario.id })
            .first();

        if (!pokemon) {
            return res.status(404).json({ mensagem: 'Pokemon não existe' });
        }

        pokemon.habilidades = pokemon.habilidades.split(', ');
        pokemon.usuario = req.usuario.nome;

        return res.json(pokemon);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
};

module.exports = detalharPokemon;
