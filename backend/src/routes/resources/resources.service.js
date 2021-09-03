const knex = require("../../database/connection");

const table = "resources";

function list() {
    return knex(table)
        .select("*");
}

function find(resourceId) {
    return knex(table)
        .select("*")
        .where({
            id: resourceId
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
            title: data.title,
            type: data.type,
            url: data.url,
        });
}

function remove(resourceId) {
    return knex(table)
        .where({ id: resourceId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}