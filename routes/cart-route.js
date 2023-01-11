const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart-controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const Roles = require("../utils/roles");

router.use(authentication.authenticateByToken);
router.use(authorization.authorizeByRole([Roles.CUSTOMER]));

router.get("/info", cartController.getInfo);
router.delete("/clear", cartController.clear);

module.exports = router;
