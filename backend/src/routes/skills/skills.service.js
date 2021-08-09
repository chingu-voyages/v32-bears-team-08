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

module.exports = {
    list,
    find,
    create,
}