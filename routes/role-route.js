const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role-controller");
const authorization = require("../middlewares/authorization");
const { roleSchema } = require("../validations/role-schema");
const validator = require("../middlewares/validator");

router.use(authorization.authorizeToken);
router.use(authorization.authorizeRole(["admin"]));

router.get("/", roleController.getAll);
router.get("/search", authorization.authorizeRole(["admin"]), roleController.search);
router.get("/:id", roleController.getById);
router.get("/:name/users", roleController.getUsers);

router.post("/", validator.validate(roleSchema), roleController.save);

module.exports = router;
