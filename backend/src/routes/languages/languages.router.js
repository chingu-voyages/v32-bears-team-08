const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./languages.controller");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route("/:language_id")
    .get(controller.find)
    .all(methodNotAllowed);

module.exports = router;