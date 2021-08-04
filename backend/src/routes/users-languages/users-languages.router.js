const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./users-languages.controller");

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:user-language_id")
    .get(controller.find)
    .put(controller.update)
    .delete(controller.remove)
    .all(methodNotAllowed);

module.exports = router;