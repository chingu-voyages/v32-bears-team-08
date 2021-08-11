const knex = require("../../database/connection");

const table = "users-resources";

function list() {
    return knex(table)
        .select("*");
}

function find(userResourceId) {
    return knex(table)
        .select("*")
        .where({
            id: userResourceId
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
            user: data.user,
            resource: data.resource,
        });
}

function remove(userResourceId) {
    return knex(table)
        .where({ id: userResourceId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}