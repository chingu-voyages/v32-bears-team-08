const knex = require("../../database/connection");

const table = "users-languages";

function list() {
    return knex(table)
        .select("*");
}

function find(userLanguageId) {
    return knex(table)
        .select("*")
        .where({
            id: userLanguageId
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
            language: data.language,
            fluency: data.fluency,
        });
}

function remove(userLanguageId) {
    return knex(table)
        .where({ id: userLanguageId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}