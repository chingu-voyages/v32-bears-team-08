const knex = require("../../database/connection");

const table = "users-skills";

function list() {
    return knex(table)
        .select("*");
}

function find(userSkillId) {
    return knex(table)
        .select("*")
        .where({
            id: userSkillId
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
            skill: data.skill,
            proficiency: data.proficiency,
            streak: data.streak,
        });
}

function remove(userSkillId) {
    return knex(table)
        .where({ id: userSkillId })
        .del();
}

module.exports = {
    list,
    find,
    create,
    update,
    remove,
}