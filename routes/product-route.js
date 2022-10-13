const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const authorization = require("../middlewares/authorization");
const { productSchema } = require("../validations/product-schema");
const { productUpdateSchema } = require("../validations/product-update-schema");
const validator = require("../middlewares/validator");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole(["admin"]), productController.getAll);
router.get("/search", authorization.authorizeRole(["admin", "seller", "customer"]), productController.search);
router.get("/:id", authorization.authorizeRole(["admin", "seller"]), productController.getById);
router.get("/:id/categories", productController.getCategory);

router.post("/", authorization.authorizeRole(["admin", "seller"]), validator.validate(productSchema), productController.save);

router.put("/", validator.validate(productUpdateSchema), productController.update);

router.delete("/:id", authorization.authorizeRole(["admin"]), productController.delete);

module.exports = router;
