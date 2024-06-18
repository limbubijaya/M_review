/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('review').del()
  await knex('google_user').del()
  await knex('google_user').insert([
    {email: 'sid@gmail.com', username: 'sid', google_id: "123456sid"}
  ]);
};
