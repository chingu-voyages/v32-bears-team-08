const knex = require("../../database/connection");

const table = "users";

function find(userId) {
	return knex(table).select("*").where({
		id: userId,
	});
}

function update(data) {
	return knex(table)
		.select("*")
		.where({ id: data.id })
		.update({
			name: data.name,
			bio: data.bio,
			active: data.active,
			goal: data.goal,
			updated_at: knex.fn.now(),
		})
		.returning("*");
}

function remove(userId) {
	return knex(table).where({ id: userId }).del();
}

function recommend(userId) {
	return knex(table)
		.distinct(`${table}.*`)
		.from({us1: "users-skills"})
		.join({us2: "users-skills"}, "us1.skill", "=", "us2.skill")
        .join(table, `${table}.id`, "=", "us2.user" )
        .where("us1.user", userId).whereNot("us2.user", userId)
}
module.exports = {
	find,
	update,
	remove,
    recommend,
};
