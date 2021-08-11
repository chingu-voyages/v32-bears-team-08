const invites = require("./05_invites.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE invites RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("invites").insert(invites);
        });
};