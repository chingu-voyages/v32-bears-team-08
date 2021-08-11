const knex = require("../../database/connection");

const table = "opportunities";

function list() {
    return knex(table)
        .select("*");
}

function find(opportunityId) {
    return knex(table)
        .select("*")
        .where({
            id: opportunityId
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
            subskill: data.subskill,
            user_skill: data.user_skill,
        });
}

function remove(opportunityId) {
    return knex(table)
        .where({ id: opportunityId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}