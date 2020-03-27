
exports.up = function(knex) {
    //create table
  return knex.schema.createTable('incidents', function (table) {
    table.increments(); //chave primaria criada automaticamente
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable(); // relacionamento 

    table.foreign('ong_id').references('id').inTable('ongs'); //referencia da chave estrangeira
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');  //drop table

};
