const opportunities = require("./17_opportunites.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE opportunities RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("opportunities").insert(opportunities);
        });
};