const knex = require("../../database/connection");

const table = "blocked";

function list() {
    return knex(table)
        .select("*");
}

function find(blockedId) {
    return knex(table)
        .select("*")
        .where({
            id: blockedId
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
            anchor: data.anchor,
            target: data.target,
        });
}

function remove(blockedId) {
    return knex(table)
        .where({ id: blockedId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}