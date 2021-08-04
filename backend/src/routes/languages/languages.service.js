const knex = require("../../database/connection");

const table = "languages";

function list() {
    return knex(table)
        .select("*");
}

function find(languageId) {
    return knex(table)
        .select("*")
        .where({
            id: languageId
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

function remove(languageId) {
    return knex(table)
        .where({ id: languageId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}