const knex = require("../../database/connection");

const table = "users";

function list() {
    return knex(table)
        .select("*");
}

function find(userId) {
    return knex(table)
        .select("*")
        .where({
            id: userId
        });
}

function create(data) {
    return knex(table)
        .insert(data, "*");
}

function update(data) {
    return knex(table)
        .select("*")
        .where({ id: data.id })
        .update({
            name: data.name,
            bio: data.bio,
            active: data.active,
        });
}

function remove(userId) {
    return knex(table)
        .where({ id: userId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}