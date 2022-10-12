const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const authorization = require("../middlewares/authorization");
const { productSchema } = require("../validations/product-schema");
const validator = require("../middlewares/validator");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole(["admin"]), productController.getAll);
router.get("/search", authorization.authorizeRole(["admin", "seller", "customer"]), productController.search);
router.get("/:id", authorization.authorizeRole(["admin", "seller"]), productController.getById);
router.post("/", authorization.authorizeRole(["admin", "seller"]), validator.validate(productSchema), productController.save);
module.exports = router;
