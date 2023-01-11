const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const Roles = require("../utils/roles");

router.use(authentication.authenticateByToken);

router.get("/", authorization.authorizeByRole([Roles.ADMIN]), userController.getAll);
router.get("/searchAll", authorization.authorizeByRole(Roles.ALL), userController.searchAll);
router.get("/:id", authorization.authorizeByRole([Roles.ADMIN]), userController.getById);
router.get("/:id/roles", authorization.authorizeByRole([Roles.ADMIN]), userController.getRole);
module.exports = router;
