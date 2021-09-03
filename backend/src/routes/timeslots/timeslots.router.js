const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./timeslots.controller");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:timeslot_id")
    .get(controller.find)
    .all(methodNotAllowed);

module.exports = router;