const usersUsers = require("./10_users-users.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE users-users RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("users-users").insert(usersUsers);
        });
};