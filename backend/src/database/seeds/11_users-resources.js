const usersResources = require("./11_users-resources.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE users-resources RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("users-resources").insert(usersResources);
        });
};