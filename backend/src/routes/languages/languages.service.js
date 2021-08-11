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

module.exports = {
    list,
    find,
}