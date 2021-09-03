const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./skills.controller");
const loginController = require("../login/login.controller");

router
	.route("/")
	.all(loginController.requireAuth)
	.get(controller.list)
	.post(controller.create)
	.all(methodNotAllowed);

router
	.route("/:skill_id")
	.all(loginController.requireAuth)
	.get(controller.find)
	.all(methodNotAllowed);

router
	.route("/user/:user_id")
	.all(loginController.requireAuth)
	.get(controller.findByUser)
	.all(methodNotAllowed);

module.exports = router;
