const knex = require('../conexao');

const excluirPokemon = async (req, res) => {
    const { id } = req.params;

    try {
        const rowCount = await knex('pokemons')
            .where({ id, usuario_id: req.usuario.id })
            .del();

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Pokemon não existe' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

module.exports = excluirPokemon;
