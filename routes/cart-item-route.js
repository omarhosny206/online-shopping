const express = require("express");
const router = express.Router();
const cartItemController = require("../controllers/cart-item-controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const Roles = require("../utils/roles");
const { cartItemSchema } = require("../validations/cart-item-schema");
const { cartItemDeletionSchema } = require("../validations/cart-item-deletion-schema");
const validator = require("../middlewares/validator");

router.use(authentication.authenticateByToken);
router.use(authorization.authorizeByRole([Roles.CUSTOMER]));

router.post("/", validator.validate(cartItemSchema), cartItemController.save);

router.put("/", validator.validate(cartItemSchema), cartItemController.update);

router.delete("/", validator.validate(cartItemDeletionSchema), cartItemController.delete);

module.exports = router;
