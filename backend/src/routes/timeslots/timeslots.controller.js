const service = require("./timeslots.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const response = await service.list();
    return res.json({
        data: response,
    })
}

async function find(req, res, next) {
    const response = await service.find(req.params.timeslot_id);
    if (response[0]) {
        return res.json({ 
            data: response[0],
        });
    }
    next({
        status: 404,
        message: `timeslot ${req.params.timeslot_id} not found`,
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

function hasDay(req, res, next) {
    if (req.body.data.day) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have day property",
    })
}

function hasTime(req, res, next) {
    if (req.body.data.time) {
        return next();
    }
    next({
        status: 400,
        message: "request body data must have time property",
    })
}

module.exports = {
    list: [
        asyncErrorBoundary(list),
    ],
    find: [
        asyncErrorBoundary(find),
    ],
}