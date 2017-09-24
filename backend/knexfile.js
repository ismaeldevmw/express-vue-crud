// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'express_aplication'
    },
    migrations: {
      directory: __dirname + '/config/db/migrations'
    },
    seeds: {
      directory: __dirname + '/config/db/seeds'
    },
    useNullAsDefault: true
  }
};
