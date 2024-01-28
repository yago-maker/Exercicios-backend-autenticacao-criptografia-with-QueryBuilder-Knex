const knex = require('knex') ({

  client: 'pg', 
  connection: {
     user: 'postgres', 
     host: 'localhost',
     database: 'knexjs', 
     password: 'postgres',
     port: 5432,
  }
});



module.exports = knex