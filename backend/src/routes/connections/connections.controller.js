const service = require("./connections.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const response = await service.list();
    return res.json({
        data: response,
    })
}

async function find(req, res, next) {
    const response = await service.find(req.params.connection_id);
    if (response[0]) {
        return res.json({ 
            data: response[0],
        });
    }
    next({
        status: 404,
        message: `connection ${req.params.connection_id} not found`,
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
    const response = await service.remove(req.params.connection_id);
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

function hasRequested(req, res, next) {
    if (req.body.data.user1) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have requested property",
    })
}

function hasAccepted(req, res, next) {
    if (req.body.data.user2) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have accepted property",
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

module.exports = {
    list: [
        asyncErrorBoundary(list),
    ],
    find: [
        asyncErrorBoundary(find),
    ],
    create: [
        hasData,
        hasRequested,
        hasAccepted,
        hasSkill,
        asyncErrorBoundary(create),
    ],
    update: [
        asyncErrorBoundary(update),
    ],
    remove: [
        asyncErrorBoundary(remove),
    ],
}