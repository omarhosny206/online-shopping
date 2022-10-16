const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category-controller");
const authorization = require("../middlewares/authorization");
const { categorySchema } = require("../validations/category-schema");
const validator = require("../middlewares/validator");
const Roles = require("../utils/roles");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole([Roles.ADMIN]), categoryController.getAll);
router.get("/searchAll", authorization.authorizeRole(Roles.ALL), categoryController.searchOne);
router.get("/:id", authorization.authorizeRole([Roles.ADMIN, Roles.SELLER]), categoryController.getById);

router.post("/", authorization.authorizeRole([Roles.ADMIN, Roles.SELLER]), validator.validate(categorySchema), categoryController.save);
module.exports = router;
