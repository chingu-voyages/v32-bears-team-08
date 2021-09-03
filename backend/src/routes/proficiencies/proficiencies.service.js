const knex = require("../../database/connection");

const table = "proficiencies";

function list() {
    return knex(table)
        .select("*");
}

function find(proficiencyId) {
    return knex(table)
        .select("*")
        .where({
            id: proficiencyId
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

function remove(proficiencyId) {
    return knex(table)
        .where({ id: proficiencyId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}