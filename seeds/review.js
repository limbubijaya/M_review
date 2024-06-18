/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('review').del()
  await knex('review').insert([
    {local_user_email: "limbubj@ymail.com", movie_id: 4, comment: 'I like the movie', rating: 7},
    {local_user_email: 'sid@ymail.com', movie_id: 4, comment: 'I don\'t like the movie', rating: 4},
    {local_user_email: "limbubj@ymail.com", movie_id: 5, comment: 'I like the movie', rating: 6},
    {local_user_email: "limbubj@ymail.com", movie_id: 6, comment: 'I like the movie', rating: 8},
    {local_user_email: "limbubj@ymail.com", movie_id: 7, comment: 'I like the movie', rating: 9},
    {local_user_email: "limbubj@ymail.com", movie_id: 8, comment: 'I like the movie', rating: 5},
    {local_user_email: "limbubj@ymail.com", movie_id: 9, comment: 'I like the movie', rating: 7},
    {local_user_email: "limbubj@ymail.com", movie_id: 10, comment: 'I like the movie', rating: 7},
    {local_user_email: "limbubj@ymail.com", movie_id: 11, comment: 'I like the movie', rating: 8},
    {local_user_email: "limbubj@ymail.com", movie_id: 12, comment: 'I like the movie', rating: 6},
    {local_user_email: "sid@ymail.com", movie_id: 5, comment: 'I don\'t like the movie', rating: 5},
    {local_user_email: "sid@ymail.com", movie_id: 6, comment: 'I don\'t like the movie', rating: 3},
  ]);
};
