const usersLanguages = require("./08_users-languages.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE users-languages RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("users-languages").insert(usersLanguages);
        });
};