/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'average', last_name: 'blogger', username: 'youraverageblogger', password: 'notyouraverageblogger'},
    {first_name: 'Bertha', last_name: 'Baker', username: 'ilovebaking', password: 'cookiesncake'},
    {first_name: 'Cornilius', last_name: 'Dagger', username: 'xXprogamerXx', password: 'iloveleague'}
  ]);
};