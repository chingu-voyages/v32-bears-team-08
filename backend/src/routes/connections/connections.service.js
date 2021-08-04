const knex = require("../../database/connection");

const table = "connections";

function list() {
    return knex(table)
        .select("*");
}

function find(connectionId) {
    return knex(table)
        .select("*")
        .where({
            id: connectionId
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
            requested: data.requested,
            accepted: data.accepted,
            skill: data.skill,
            connected: data.connected,
            blocked: data.blocked,
        });
}

function remove(connectionId) {
    return knex(table)
        .where({ id: connectionId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}