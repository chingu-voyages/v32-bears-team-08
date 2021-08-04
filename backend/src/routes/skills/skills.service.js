const knex = require("../../database/connection");

const table = "skills";

function list() {
    return knex(table)
        .select("*");
}

function find(skillId) {
    return knex(table)
        .select("*")
        .where({
            id: skillId
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
        });
}

function remove(skillId) {
    return knex(table)
        .where({ id: skillId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}