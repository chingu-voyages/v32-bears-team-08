const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./accepted.controller");
const loginController = require("../login/login.controller")

router
    .route("/")
    .all(loginController.requireAuth)
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:accepted_id")
    .all(loginController.requireAuth)
    .get(controller.find)
    .put(controller.update)
    .delete(controller.remove)
    .all(methodNotAllowed);

module.exports = router;