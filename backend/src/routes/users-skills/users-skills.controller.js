const service = require("./users-skills.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const response = await service.list();
    return res.json({
        data: response,
    })
}

async function find(req, res, next) {
    const response = await service.find(req.params.user-skill_id);
    if (response[0]) {
        return res.json({ 
            data: response[0],
        });
    }
    next({
        status: 404,
        message: `user-skill ${req.params.user-skill_id} not found`,
    })
}

async function create(req, res, next) {
    const response = await service.create(req.body.data);
    return res.status(201).json({
        data: response[0],
    })
}

async function update(req, res, next) {
    const response = await service.update(req.body.data);
    return res.json({
        data: response[0],
    })
}

async function remove(req, res, next) {
    const response = await service.remove(req.params.user-skill_id);
    return res.json({
        data: response[0],
    })
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

function hasUser(req, res, next) {
    if (req.body.data.user) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have user property",
    })
}

function hasSkill(req, res, next) {
    if (req.body.data.skill) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have skill property",
    })
}

function hasProficiency(req, res, next) {
    if (req.body.data.proficiency) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have proficiency property",
    })
}

module.exports = {
    list: [
        asyncErrorBoundary(list),
    ],
    find: [
        asyncErrorBoundary(find),
    ],
    create: [
        hasData,
        hasUser,
        hasProficiency,        
        asyncErrorBoundary(create),
    ],
    update: [
        asyncErrorBoundary(update),
    ],
    remove: [
        asyncErrorBoundary(remove),
    ],
}