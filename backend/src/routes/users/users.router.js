const router = require("express").Router();
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./users.controller");
const loginController = require("../login/login.controller");

router
  .route("/:user_id")
  .all(loginController.requireAuth)
  .get(controller.find)
  .put(controller.update)
  .delete(controller.remove)
  .all(methodNotAllowed);

module.exports = router;
