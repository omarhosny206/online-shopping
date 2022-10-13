const express = require("express");
const router = express.Router();
const cartProductsController = require("../controllers/cart-products-controller");
const authorization = require("../middlewares/authorization");
const Roles = require("../utils/roles");
const { cartProductsSchema } = require("../validations/cart-products-schema");
const validator = require("../middlewares/validator");

router.use(authorization.authorizeToken);
router.use(authorization.authorizeRole([Roles.CUSTOMER]));

router.post("/", validator.validate(cartProductsSchema), cartProductsController.save);

module.exports = router;
