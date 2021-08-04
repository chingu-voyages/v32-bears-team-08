const service = require("./invites.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const response = await service.list();
    return res.json({
        data: response,
    })
}

async function find(req, res, next) {
    const response = await service.find(req.params.invite_id);
    if (response[0]) {
        return res.json({ 
            data: response[0],
        });
    }
    next({
        status: 404,
        message: `invite ${req.params.invite_id} not found`,
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
    const response = await service.remove(req.params.invite_id);
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

function hasEmail(req, res, next) {
    if (req.body.data.email) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have email property",
    })
}

function hasMessage(req, res, next) {
    if (req.body.data.email) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have message property",
    })
}

function hasSender(req, res, next) {
    if (req.body.data.sender) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have sender property",
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
        hasEmail,
        hasMessage,
        hasSender,
        asyncErrorBoundary(create),
    ],
    update: [
        asyncErrorBoundary(update),
    ],
    remove: [
        asyncErrorBoundary(remove),
    ],
}