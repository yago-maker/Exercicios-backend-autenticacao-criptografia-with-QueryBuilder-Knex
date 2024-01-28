const express = require('express'); 
const { cadastrarUsuario } = require('./controladores/usuarios')
const login = require('./controladores/login')
const verificaLogin = require('./intermediarios/verificalogin')
const cadastrarPokemon = require('./controladores/pokemons')
const attApelidoPokemon = require('./controladores/attapelido')
const listarPokemons = require('./controladores/listar')
const detalharPokemon = require('./controladores/detallhar')
const excluirPokemon = require('./controladores/excluir')


const rotas = express();


rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)

rotas.use(verificaLogin)

rotas.post('/pokemon', cadastrarPokemon)
rotas.patch('/pokemon/:id', attApelidoPokemon)
rotas.get('/pokemons', listarPokemons)
rotas.get('/pokemons/:id', detalharPokemon)
rotas.delete('/pokemons/:id', excluirPokemon)


module.exports = rotas;