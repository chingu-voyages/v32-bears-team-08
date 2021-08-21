const service = require("./users-skills.service");
const skillsService = require("../skills/skills.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
	const response = await service.list();
	return res.json({
		data: response,
	});
}

async function find(req, res, next) {
	const response = await service.find(req.params.user_skill_id);
	if (response[0]) {
		return res.json({
			data: response[0],
		});
	}
	next({
		status: 404,
		message: `user-skill ${req.params.user_skill_id} not found`,
	});
}

async function findUserSkills(req, res, next) {
	const response = await service.findByUser(req.params.user_id);

	if (response[0]) {
		const skills = await response.map(async (ele) => {
			const skill = await skillsService.find(ele.skill);
			return skill[0];
		})

		const data = await Promise.all(skills);

		return res.json({
			data: data,
		});
	}

	next({
		status: 404,
		message: `user ${req.params.user_id} not found`,
	});
}

async function create(req, res, next) {
	const response = await service.create(req.body.data);
	return res.status(201).json({
		data: response[0],
	});
}

async function remove(req, res, next) {
	const response = await service.remove(req.params.user_skill_id);
	return res.json({
		data: response[0],
	});
}

function hasData(req, res, next) {
	if (req.body.data) {
		return next();
	}
	next({
		status: 400,
		message: "request body must have data property",
	});
}

function hasUser(req, res, next) {
	if (req.body.data.user) {
		return next();
	}
	next({
		status: 400,
		message: "request body data must have user property",
	});
}

function hasSkill(req, res, next) {
	if (req.body.data.skill) {
		return next();
	}
	next({
		status: 400,
		message: "request body data must have skill property",
	});
}

module.exports = {
	list: [asyncErrorBoundary(list)],
	find: [asyncErrorBoundary(find)],

	findUserSkills: [asyncErrorBoundary(findUserSkills)],
	create: [hasData, hasUser, hasSkill, asyncErrorBoundary(create)],
	remove: [asyncErrorBoundary(remove)],
};
