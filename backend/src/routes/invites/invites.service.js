const knex = require("../../database/connection");

const table = "invites";

function list() {
    return knex(table)
        .select("*");
}

function find(inviteId) {
    return knex(table)
        .select("*")
        .where({
            id: inviteId
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
            email: data.email,
            message: data.message,
            sender: data.sender,
            sent: data.sent,
            accepted: data.accepted,
        });
}

function remove(inviteId) {
    return knex(table)
        .where({ id: inviteId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}