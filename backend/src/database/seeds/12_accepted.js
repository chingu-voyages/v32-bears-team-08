const accepted = require("./12_accepted.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE accepted RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("accepted").insert(accepted);
        });
};