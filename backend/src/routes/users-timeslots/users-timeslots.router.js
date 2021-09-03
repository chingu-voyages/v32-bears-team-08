const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./users-timeslots.controller");
const loginController = require("../login/login.controller")

router
    .route("/")
    .all(loginController.requireAuth)
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:user-timeslot_id")
    .all(loginController.requireAuth)
    .get(controller.find)
    .put(controller.update)
    .delete(controller.remove)
    .all(methodNotAllowed);

module.exports = router;