const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authorization = require("../middlewares/authorization");
const Roles = require("../utils/roles");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole([Roles.ADMIN]), userController.getAll);
router.get("/search", authorization.authorizeRole(Roles.ALL), userController.search);
router.get("/:id", authorization.authorizeRole([Roles.ADMIN]), userController.getById);
router.get("/:id/roles", authorization.authorizeRole([Roles.ADMIN]), userController.getRole);
module.exports = router;
