const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const { productSchema } = require("../validations/product-schema");
const { productUpdateSchema } = require("../validations/product-update-schema");
const validator = require("../middlewares/validator");
const Roles = require("../utils/roles");

router.use(authentication.authenticateByToken);

router.get("/", authorization.authorizeByRole([Roles.ADMIN]), productController.getAll);
router.get("/search", authorization.authorizeByRole(Roles.ALL), productController.searchAll);
router.get("/:id", authorization.authorizeByRole([Roles.ADMIN, Roles.SELLER]), productController.getById);
router.get("/:id/categories", productController.getCategory);

router.post("/", authorization.authorizeByRole([Roles.ADMIN]), validator.validate(productSchema), productController.save);

router.put("/", authorization.authorizeByRole([Roles.ADMIN]), validator.validate(productUpdateSchema), productController.update);

router.delete("/:id", authorization.authorizeByRole([Roles.ADMIN]), productController.delete);

module.exports = router;
