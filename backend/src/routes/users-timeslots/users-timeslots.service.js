const knex = require("../../database/connection");

const table = "users-timeslots";

function list() {
    return knex(table)
        .select("*");
}

function find(userTimeslotId) {
    return knex(table)
        .select("*")
        .where({
            id: userTimeslotId
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
            timeslot: data.timeslot,
            available: data.available,
        });
}

function remove(userTimeslotId) {
    return knex(table)
        .where({ id: userTimeslotId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}