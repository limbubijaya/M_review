/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('review', (table) => {
        table.increments();
        table.string("local_user_email").unsigned().notNullable();
        table.foreign("local_user_email").references("local_user.email");
        table.integer("movie_id").unsigned().notNullable();
        table.foreign("movie_id").references("movie.id");
        table.string("comment", 1000).notNullable();
        table.float('rating', 2, 1).notNullable();
        table.timestamps(false, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return (knex.schema.dropTableIfExists('review'));
};
