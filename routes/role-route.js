const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role-controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const { roleSchema } = require("../validations/role-schema");
const validator = require("../middlewares/validator");
const Roles = require("../utils/roles");

router.use(authentication.authenticateByToken);
router.use(authorization.authorizeByRole([Roles.ADMIN]));

router.get("/", roleController.getAll);
router.get("/searchAll", roleController.searchAll);
router.get("/:id", roleController.getById);
router.get("/:name/users", roleController.getUsers);

router.post("/", validator.validate(roleSchema), roleController.save);

module.exports = router;
