const blocked = require("./14_blocked.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE blocked RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("blocked").insert(blocked);
        });
};