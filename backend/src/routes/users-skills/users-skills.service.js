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
		.select(
			`${table}.*`,
		)
		.join("skills", "skills.id", "=", `${table}.skill`)
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

function removeBySkill(data){
	return knex(table).where({ skill: data.skill }).where({user: data.user}).del().returning('*');

}

module.exports = {
	list,
	find,
	findByUser,
	findOneByUserAndSkill,
	create,
	remove,
	removeBySkill
};
