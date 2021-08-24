const service = require("./languages.service");
const usersLanguagesService = require("../users-languages/users-languages.service")
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const response = await service.list();
    return res.json({
        data: response,
    })
}

async function find(req, res, next) {
    const response = await service.find(req.params.language_id);
    if (response[0]) {
        return res.json({ 
            data: response[0],
        });
    }
    next({
        status: 404,
        message: `language ${req.params.language_id} not found`,
    })
}

async function findUserLanguages(req, res, next) {
	const response = await service.findByUser(req.params.user_id);

	return res.json({
		data: response,
	});
}

async function create(req, res, next) {
	const { user } = req;
    const {data} = req.body
    const name  = data.name.toLowerCase()

	//check if language already exists

	const findLanguage = await service.findByName(name);

	//if language doesn't exist, then insert skill and new user-language into db

	if (!findLanguage[0]) {
		const language = await service.create({name});
		const userLanguage = await usersLanguagesService.create({
			user: user.id,
			language: language[0].id,
		});

		return res.status(201).json({
			data: language[0],
		});
	}

	//check if user already has a relationship with the language

	const findUserLanguage = await usersLanguagesService.findOneByUserandLanguage({
		user: user.id,
		language: findLanguage[0].id,
	});

	//if user has no relationship with language insert new users-languages into db
	if (!findUserLanguage[0]) {
		const userLanguage = await usersLanguagesService.create({
			user: user.id,
			language: findLanguage[0].id,
		});

		return res.status(201).json({
			data: findLanguage
		});
	} else {
		return next({
			status: 400,
			message: "user already has this language",
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
    })
}

function hasName(req, res, next) {
    if (req.body.data.name) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have name property",
    })
}


module.exports = {
    list: [
        asyncErrorBoundary(list),
    ],
    find: [
        asyncErrorBoundary(find),
    ],

    findUserLanguages: [asyncErrorBoundary(findUserLanguages)],
    create: [
        hasData, hasName, asyncErrorBoundary(create)
    ]
}