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

function create(data) {
    return knex(table)
        .insert(data, "*");
}

function update(data) {
    return knex(table)
        .select("*")
        .where({ id: data.id })
        .update({
            day: data.day,
            time: data.time,
        });
}

function remove(timeslotId) {
    return knex(table)
        .where({ id: timeslotId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}