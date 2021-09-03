const service = require("./skills.service");
const usersSkillsService = require("../users-skills/users-skills.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
	const response = await service.list();
	return res.json({
		data: response,
	});
}

async function find(req, res, next) {
	const response = await service.find(req.params.skill_id);
	if (response[0]) {
		return res.json({
			data: response[0],
		});
	}
	next({
		status: 404,
		message: `skill ${req.params.skill_id} not found`,
	});
}

async function findByUser(req, res, next){
	const id = req.params.user_id

	const response = await service.findByUser(id)

	return res.json({
		data: response,
	});
	
}

async function create(req, res, next) {
	const { user } = req;

	//check if skill already exists
	const findSkill = await service.findByName(req.body.data.name);
	//if skill doesn't exist, then insert skill and new users-skills into db
	if (!findSkill[0]) {
		const skill = await service.create(req.body.data);
		const userSkill = await usersSkillsService.create({
			user: user.id,
			skill: skill[0].id,
		});


		return res.status(201).json({
			data: skill,
		});
	}
	//check if user already has a relationship with the skill

	const findUserSkill = await usersSkillsService.findOneByUserAndSkill({
		user: user.id,
		skill: findSkill[0].id,
	});
    // if user doesn't have skill insert new users-skills into the db

	if (!findUserSkill[0]) {
		const userSkill = await usersSkillsService.create({
			user: user.id,
			skill: findSkill[0].id,
		});
		return res.status(201).json({
			data:  findSkill ,
		});
	} else {
		return next({
			status: 400,
			message: "user already has this skill",
		});
	}
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

function hasName(req, res, next) {
	if (req.body.data.name) {
		return next();
	}
	next({
		status: 400,
		message: "request body data must have name property",
	});
}

module.exports = {
	list: [asyncErrorBoundary(list)],
	find: [hasData, asyncErrorBoundary(find)],
	findByUser: [asyncErrorBoundary(findByUser)],
	create: [hasData, hasName, asyncErrorBoundary(create)],
};
