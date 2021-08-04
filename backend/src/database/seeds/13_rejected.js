const rejected = require("./13_rejected.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE rejected RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("rejected").insert(rejected);
        });
};