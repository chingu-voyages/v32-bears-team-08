const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const loginController = require("../login/login.controller");
const controller = require("./invites.controller");

router
    .route("/")
    .all(loginController.requireAuth)
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;