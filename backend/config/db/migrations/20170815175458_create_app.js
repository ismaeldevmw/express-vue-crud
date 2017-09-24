
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('marcas', (table) => {
      table.increments('marcaid').primary();
      table.string('nombre', 100).notNullable();

      table.timestamps(true, true);
    }),

    knex.schema.createTable('productos', function(table) {
      table.increments('productoid').primary();
      table.string('nombre', 100);
      table.integer('marcaid').unsigned()
      table.foreign('marcaid').references('marcas.marcaid');
      table.float('precio', 4, 2);
      table.string('descripcion');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('productos'),
    knex.schema.dropTable('marcas')
  ]);
};
