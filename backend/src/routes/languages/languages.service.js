const knex = require("../../database/connection");

const table = "languages";

function list() {
    return knex(table)
        .select("*");
}

function find(languageId) {
    return knex(table)
        .select("*")
        .where({
            id: languageId
        });
}

function findByName(languageName) {
    return knex(table)
        .select("*")
        .where({
            name: languageName
        });
}

function findByUser(userId) {
	return knex(table)
		.join("users-languages", "users-languages.language", "=", `${table}.id`)
		.select(
			"languages.*",
		)
		.where({
			user: userId,
		});
}

function create(data) {
	return knex(table).insert(data, "*");
}

module.exports = {
    list,
    find,
    findByName,
    findByUser,
    create,
}