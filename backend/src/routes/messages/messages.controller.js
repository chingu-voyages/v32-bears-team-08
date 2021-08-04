const service = require("./messages.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const response = await service.list();
    return res.json({
        data: response,
    })
}

async function find(req, res, next) {
    const response = await service.find(req.params.message_id);
    if (response[0]) {
        return res.json({ 
            data: response[0],
        });
    }
    next({
        status: 404,
        message: `message ${req.params.message_id} not found`,
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
    const response = await service.remove(req.params.message_id);
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

function hasText(req, res, next) {
    if (req.body.data.text) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have text property",
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

function hasRecipient(req, res, next) {
    if (req.body.data.recipient) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have recipient property",
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
        hasText,
        hasSender,
        hasRecipient,
        asyncErrorBoundary(create),
    ],
    update: [
        asyncErrorBoundary(update),
    ],
    remove: [
        asyncErrorBoundary(remove),
    ],
}