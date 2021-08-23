const knex = require("../../database/connection");

const table = "users";

function find(userId) {
    return knex(table)
        .select("*")
        .where({
            id: userId
        });
}

function update(data) {
    return knex(table)
        .select("*")
        .where({ id: data.id })
        .update({
            name: data.name,
            bio: data.bio,
            active: data.active,
            goal: data.goal,
            updated_at: knex.fn.now()
        });
}

function remove(userId) {
    return knex(table)
        .where({ id: userId })
        .del();
}

module.exports = {
    find,
    update,
    remove,
}