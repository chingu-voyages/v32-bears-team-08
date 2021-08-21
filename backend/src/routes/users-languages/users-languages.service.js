const knex = require("../../database/connection");

const table = "users-languages";

function list() {
    return knex(table)
        .select("*");
}

function find(userLanguageId) {
    return knex(table)
        .select("*")
        .where({
            id: userLanguageId
        });
}

function findByUser(userId) {
    return knex(table)
        .select("*")
        .where({
            user: userId
        });
}
function create(data) {
    return knex(table)
        .insert(data, "*");
}

function remove(userLanguageId) {
    return knex(table)
        .where({ id: userLanguageId })
        .del();
}

module.exports = {
    list,
    find,
    findByUser,
    create,
    remove,
}