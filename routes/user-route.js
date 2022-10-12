const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const authorization = require("../middlewares/authorization");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole(["admin"]), userController.getAll);
router.get("/search", authorization.authorizeRole(["admin", "user"]), userController.search);
router.get("/:id", authorization.authorizeRole(["admin", "user"]), userController.getById);
router.get("/:id/roles", authorization.authorizeRole(["user"]), userController.getRoles);
module.exports = router;
