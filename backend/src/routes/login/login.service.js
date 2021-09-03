const knex = require("../../database/connection");

const table = "users";

function find(email) {
    return knex(table)
        .select("*")
        .where({ email: email })
        .first()
}

module.exports = {
    find,
}