const knex = require("../../database/connection");

const table = "users-skills";

function list() {
	return knex(table).select("*");
}

function find(userSkillId) {
	return knex(table).select("*").where({
		id: userSkillId,
	});
}

function findByUser(userId) {
	return knex(table)
		.join("skills", "skills.id", "=", `${table}.skill`)
		.select(
			"skills.name",
			`${table}.skill`,
			`${table}.user`,
			`${table}.id as user-skill`
		)
		.where({
			user: userId,
		});
}

function findOneByUserAndSkill(data) {
	return knex(table)
		.select("*")
		.where("user", data.user)
		.where("skill", data.skill);
}

function create(data) {
	return knex(table).insert(data, "*");
}

function remove(userSkillId) {
	return knex(table).where({ id: userSkillId }).del();
}

module.exports = {
	list,
	find,
	findByUser,
	findOneByUserAndSkill,
	create,
	remove,
};
