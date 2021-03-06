const knex = require("../../database/connection");

const table = "skills";

function list() {
	return knex(table).select("*");
}

function find(skillId) {
	return knex(table).select("*").where({
		id: skillId,
	});
}

function findByName(skillName) {
	return knex(table).select("*").where({
		name: skillName,
	});
}
function findByUser(userId) {
	return knex(table)
		.select(
			'skills.*',
		)
		.join("users-skills", "users-skills.skill", "=", `${table}.id`)
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
};
