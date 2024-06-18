/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const saltRounds = 10;
  const myPlaintextPassword = 'password';

  const encryptedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
  await knex('review').del()
  await knex('local_user').del()
  await knex('local_user').insert([
    {email: 'limbubj@ymail.com', username: 'bijaya', password: encryptedPassword, is_linked_to_google: false, admin: true},
    {email: 'sid@ymail.com', username: 'sid', password: encryptedPassword, is_linked_to_google: true, admin: false}
  ]);
};
