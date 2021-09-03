const resources = require("./03_resources.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE resources RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("resources").insert(resources);
        });
};