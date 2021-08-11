const usersTimeslots = require("./09_users-timeslots.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE users-timeslots RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("users-timeslots").insert(usersTimeslots);
        });
};