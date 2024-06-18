/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('movie', (table) => {
      table.increments();
      table.string("title", 50).notNullable();
      table.string("description", 2000).notNullable();
      table.string("director", 255).notNullable();
      table.string("writers", 255).notNullable();
      table.string("youtube_link", 255).notNullable();
      table.string("image_link", 255).notNullable();
      table.datetime('release_date', { precision: 6 }).notNullable();
      table.timestamps(false, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return (knex.schema.dropTableIfExists('review').then(()=>{
        return knex.schema.dropTableIfExists('movie');
    }));
  };