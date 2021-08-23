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

function findByUser(data) {
	return knex(table)
		.join("users-skills", "users-skills.skill", "=", "skills.id")
		.select(
			"skills.name",
			"users-skills.skill",
			"users-skills.user",
			"users-skills.id as users-skills"
		)
		.where("users-skills.user", data.user);
}

function findOneByUser(data) {
	return knex(table)
		.join("users-skills", "users-skills.skill", "=", "skills.id")
		.select("*")
		.where("users-skills.user", data.user)
		.where("skills.id", data.skill)
}

function create(data) {
	return knex(table).insert(data, "*");
}

module.exports = {
	list,
	find,
	findByName,
	findByUser,
	findOneByUser,
	create,
};
