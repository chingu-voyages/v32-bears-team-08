const proficiencies = require("./16_proficiencies.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE proficiencies RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("proficiencies").insert(proficiencies);
        });
};