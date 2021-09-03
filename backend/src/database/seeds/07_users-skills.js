const usersSkills = require("./07_users-skills.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE users-skills RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("users-skills").insert(usersSkills);
        });
};