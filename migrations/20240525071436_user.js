/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('local_user', (table) => {
    table.string("email", 80).primary();
    table.string("username", 16).notNullable();
    table.string("password", 255).notNullable();
    table.boolean("is_linked_to_google").notNullable();
    table.boolean("admin").notNullable();
    table.timestamps(false, true);
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return (knex.schema.dropTableIfExists('review').then(()=>{
    return knex.schema.dropTableIfExists('local_user');
  }));
};
