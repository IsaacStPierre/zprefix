/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {users_id: '1', title: 'First Blog!', content: 'Hi, welcome to my first blog'},
    {users_id: '1', title: 'Follow up Blog!', content: 'Jeez guys, this stuff is hard'},
    {users_id: '2', title: 'Baking Cookies!', content: 'Found an awesome cookie recipe'},
    {users_id: '3', title: 'Pro-gamer Strats', content: 'This blog is for making sick strats for easy dubs'},
    {users_id: '3', title: 'Pro-gamer lifestyle', content: 'It aint easy boolin like I do.'}
  ]);
};
