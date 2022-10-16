const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order-controller");
const authorization = require("../middlewares/authorization");
const Roles = require("../utils/roles");

router.use(authorization.authorizeToken);
router.use(authorization.authorizeRole([Roles.CUSTOMER]));

router.get("/", orderController.getByUserId);
router.get("/info/:id", orderController.getInfo);
router.get("/:id", orderController.getById);
router.get("/:id/users", orderController.getUser);

router.post("/", orderController.save);

module.exports = router;
