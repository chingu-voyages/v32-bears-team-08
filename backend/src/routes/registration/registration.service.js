const knex = require("../../database/connection");

const table = "users";

function find(email) {
    return knex(table)
        .select("*")
        .where({ email: email })
        .first()
}

function create(data) {
    console.log(data.password)
    return knex(table)
        .insert(data, "*");
}

module.exports = {
    find,
    create,
}