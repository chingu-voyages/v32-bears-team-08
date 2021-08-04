const knex = require("../../database/connection");

const table = "messages";

function list() {
    return knex(table)
        .select("*");
}

function find(messageId) {
    return knex(table)
        .select("*")
        .where({
            id: messageId
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
            text: data.text,
            sender: data.sender,
            recipient: data.recipient,
        });
}

function remove(messageId) {
    return knex(table)
        .where({ id: messageId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}