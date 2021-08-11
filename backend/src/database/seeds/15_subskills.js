const subskills = require("./15_subskills.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE subskills RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("subskills").insert(subskills);
        });
};