const timeslots = require("./06_timeslots.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE timeslots RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("timeslots").insert(timeslots);
        });
};