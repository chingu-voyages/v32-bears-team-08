const service = require("./invites.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const response = await service.list();
    return res.json({
        data: response,
    })
}

async function create(req, res, next) {
    const response = await service.create(req.body.data);
    return res.status(201).json({
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
    create: [
        hasData,
        hasEmail,
        hasMessage,
        hasSender,
        asyncErrorBoundary(create),
    ],
}