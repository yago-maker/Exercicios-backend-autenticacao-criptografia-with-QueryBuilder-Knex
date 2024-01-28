const jwt = require('jsonwebtoken');
const knex = require('../conexao');
const senhaJwt = require('../senhaJwt');


const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'unauthorized' });
    }

    const token = authorization.split(' ')[1]
   
    try {
        const { id } = jwt.verify(token, senhaJwt);
        
        const {senha: senha, ...usuario} = await knex('usuarios').where({id}).first()

        if (!usuario) {
            return res.status(401).json({ mensagem: 'unauthorized' });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
      
       
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

module.exports = verificaLogin;
