const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./opportunities.controller");
const loginController = require("../login/login.controller")

router
    .route("/")
    .all(loginController.requireAuth)
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:opportunity_id")
    .all(loginController.requireAuth)
    .get(controller.find)
    .put(controller.update)
    .delete(controller.remove)
    .all(methodNotAllowed);

module.exports = router;