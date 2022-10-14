const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order-controller");
const authorization = require("../middlewares/authorization");
const Roles = require("../utils/roles");

router.use(authorization.authorizeToken);
router.use(authorization.authorizeRole([Roles.CUSTOMER]));

router.get("/", orderController.getByUserId);
router.get("/info", orderController.getInfo);

//router.delete("/clear", orderController.clear);

router.post("/", orderController.save);

module.exports = router;
