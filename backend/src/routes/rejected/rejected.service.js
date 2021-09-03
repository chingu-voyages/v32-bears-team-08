const knex = require("../../database/connection");

const table = "rejected";

function list() {
    return knex(table)
        .select("*");
}

function find(rejectedId) {
    return knex(table)
        .select("*")
        .where({
            id: rejectedId
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
            skill: data.skill,
        });
}

function remove(rejectedId) {
    return knex(table)
        .where({ id: rejectedId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}