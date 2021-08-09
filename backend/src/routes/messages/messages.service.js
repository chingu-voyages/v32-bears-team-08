const knex = require("../../database/connection");

const table = "messages";

function list() {
    return knex(table)
        .select("*");
}

function find(messageId) {
    return knex(table)
        .select("*")
        .where({
            id: messageId
        });
}

function create(data) {
    return knex(table)
        .insert(data, "*");
}

function remove(messageId) {
    return knex(table)
        .where({ id: messageId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    remove,
}