//conexão com o banco de dados
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //config de develop

module.exports = connection; //export

//importar arquivo conection dentro dos arquivos que é preciso se 
//conectar com banco de dados