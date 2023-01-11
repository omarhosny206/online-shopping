const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category-controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const { categorySchema } = require("../validations/category-schema");
const validator = require("../middlewares/validator");
const Roles = require("../utils/roles");

router.use(authentication.authenticateByToken);

router.get("/", authorization.authorizeByRole([Roles.ADMIN]), categoryController.getAll);
router.get("/searchAll", authorization.authorizeByRole(Roles.ALL), categoryController.searchOne);
router.get("/:id", authorization.authorizeByRole([Roles.ADMIN, Roles.SELLER]), categoryController.getById);
router.get("/:id/products", authorization.authorizeByRole(Roles.ALL), categoryController.getProducts);

router.post("/", authorization.authorizeByRole([Roles.ADMIN, Roles.SELLER]), validator.validate(categorySchema), categoryController.save);
module.exports = router;
