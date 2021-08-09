const knex = require("../../database/connection");

const table = "subskills";

function list() {
    return knex(table)
        .select("*");
}

function find(subskillId) {
    return knex(table)
        .select("*")
        .where({
            id: subskillId
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
            skill: data.skill,
        });
}

function remove(subskillId) {
    return knex(table)
        .where({ id: subskillId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}