const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./login.controller");

router
    .route("/")
    .post(controller.login)
    .all(methodNotAllowed);

router
    .route("/refresh")
    .post(controller.refresh)
    .all(methodNotAllowed);

module.exports = router;