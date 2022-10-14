const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart-controller");
const authorization = require("../middlewares/authorization");
const Roles = require("../utils/roles");

router.use(authorization.authorizeToken);
router.use(authorization.authorizeRole([Roles.CUSTOMER]));

router.get("/info", cartController.getInfo);
router.delete("/clear", cartController.clear);

module.exports = router;
