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

async function recommend(userId) {

    //returns flat array of objects 
	const flatResponse = await knex(table)
		.orderBy("id")
		.distinct(
			`${table}.id`,
			`${table}.name`,
			`${table}.email`,
			`${table}.goal`,
			"s.name as skill_name"
		)
		.from({ us1: "users-skills" })
		.join({ us2: "users-skills" }, "us1.skill", "=", "us2.skill")
		.join({ us3: "users-skills" }, "us2.user", "=", "us3.user")
		.join({ s: "skills" }, "us3.skill", "=", "s.id")
		.join(table, `${table}.id`, "=", "us3.user")
		.where("us1.user", userId)
		.whereNot("us2.user", userId);

	//creates new array of objects that combines user and their skills into single array
	const nestedResponse = flatResponse.reduce((prev, current ) => {
		const last_index = prev.length - 1;
		//if last element and current element are the same user, update the skills array of the last element
		//else return a new array containing all the previous elements and the current element
		if (prev[last_index] && current.id === prev[last_index].id) {
			const add_skill = prev[last_index].skills.concat({name:current.skill_name});
			return Object.assign([], prev, {
				[last_index]: { ...prev[last_index], skills: add_skill },
			});
		} else {
			const obj = {
					id: current.id,
					name: current.name,
					goal: current.goal,
					skills: [{name:current.skill_name}],
			};

			return prev.concat(obj);
		}

	}, []);

	return nestedResponse;

}
module.exports = {
	find,
	update,
	remove,
	recommend,
};
