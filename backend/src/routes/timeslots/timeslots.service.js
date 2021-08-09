const knex = require("../../database/connection");

const table = "timeslots";

function list() {
    return knex(table)
        .select("*");
}

function find(timeslotId) {
    return knex(table)
        .select("*")
        .where({
            id: timeslotId
        });
}

module.exports = {
    list,
    find,
}