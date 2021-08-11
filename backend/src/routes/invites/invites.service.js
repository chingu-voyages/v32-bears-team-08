const knex = require("../../database/connection");

const table = "invites";

function list() {
    return knex(table)
        .select("*");
}

function create(data) {
    return knex(table)
        .insert(data, "*");
}

module.exports = {
    list,
    create,
}