const skills = require("./01_skills.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE skills RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("skills").insert(skills);
        });
};