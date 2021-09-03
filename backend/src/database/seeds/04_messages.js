const messages = require("./04_messages.json");

exports.seed = function (knex) {
    return knex
        .raw("TRUNCATE TABLE messages RESTART IDENTITY CASCADE")
        .then(function () {
            return knex("messages").insert(messages);
        });
};