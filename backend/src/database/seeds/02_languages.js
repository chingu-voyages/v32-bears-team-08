const languages = require("./02_languages.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE languages RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("languages").insert(languages);
        });
};