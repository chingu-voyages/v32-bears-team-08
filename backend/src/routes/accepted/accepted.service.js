const knex = require("../../database/connection");

const table = "accepted";

function list() {
    return knex(table)
        .select("*");
}

function find(acceptedId) {
    return knex(table)
        .select("*")
        .where({
            id: acceptedId
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

function remove(acceptedId) {
    return knex(table)
        .where({ id: acceptedId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}