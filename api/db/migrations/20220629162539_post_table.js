/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('posts_id');
        table.integer('users_id');
        table.foreign('users_id').references('users.users_id')
        table.string('title', 50);
        table.string('content', 500);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('posts', table => {
        table.dropForeign('users_id')
    })
    .then(function () {
        return knex.schema.dropTableIfExists('posts');
    })
};