const knex = require("../../database/connection");

const table = "users-languages";

function list() {
	return knex(table).select("*");
}

function find(userLanguageId) {
	return knex(table).select("*").where({
		id: userLanguageId,
	});
}

function findByUser(userId) {
	return knex(table)
		.join("languages", "languages.id", "=", `${table}.language`)
		.select(
			`${table}.*`,
		)
		.where({
			user: userId,
		});
}

function findOneByUserandLanguage(data) {
	return knex(table)
		.select("*")
		.where("user", data.user)
		.where("language", data.language);
}

function create(data) {
	return knex(table).insert(data, "*");
}

function remove(userLanguageId) {
	return knex(table).where({ id: userLanguageId }).del();
}

function removeByLanguage(data){
	return knex(table).where({ language: data.language }).where({user: data.user}).del().returning('*');

}


module.exports = {
	list,
	find,
	findByUser,
    findOneByUserandLanguage,
	create,
	remove,
	removeByLanguage
};
