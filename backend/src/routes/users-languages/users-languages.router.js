const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./users-languages.controller");
const loginController = require("../login/login.controller");

router
	.route("/")
	.all(loginController.requireAuth)
	.get(controller.list)
	.post(controller.create)
	.all(methodNotAllowed);

router
	.route("/:user-language_id")
	.all(loginController.requireAuth)
	.get(controller.find)
	.delete(controller.remove)
	.all(methodNotAllowed);

router
	.route("/user/:user_id")
	.all(loginController.requireAuth)
	.get(controller.findUserLanguages)
	.all(methodNotAllowed);

module.exports = router;
