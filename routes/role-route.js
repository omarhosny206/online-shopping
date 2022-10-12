const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role-controller");
const authorization = require("../middlewares/authorization");

router.use(authorization.authorizeToken);

router.get("/", roleController.getAll);
router.get("/search", roleController.search);
router.get("/:id", roleController.getById);
router.get("/:name/users", roleController.getUsers);

module.exports = router;
