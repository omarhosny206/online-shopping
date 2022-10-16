const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const authorization = require("../middlewares/authorization");
const { productSchema } = require("../validations/product-schema");
const { productUpdateSchema } = require("../validations/product-update-schema");
const validator = require("../middlewares/validator");
const Roles = require("../utils/roles");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole([Roles.ADMIN]), productController.getAll);
router.get("/searchAll", authorization.authorizeRole(Roles.ALL), productController.searchAll);
router.get("/:id", authorization.authorizeRole([Roles.ADMIN, Roles.SELLER]), productController.getById);
router.get("/:id/categories", productController.getCategory);

router.post("/", authorization.authorizeRole([Roles.ADMIN]), validator.validate(productSchema), productController.save);

router.put("/", authorization.authorizeRole([Roles.ADMIN]), validator.validate(productUpdateSchema), productController.update);

router.delete("/:id", authorization.authorizeRole([Roles.ADMIN]), productController.delete);

module.exports = router;
