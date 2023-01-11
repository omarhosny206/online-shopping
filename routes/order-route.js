const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order-controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const Roles = require("../utils/roles");

router.use(authentication.authenticateByToken);
router.use(authorization.authorizeByRole([Roles.CUSTOMER]));

router.get("/", orderController.getByUserId);
router.get("/info/:id", orderController.getInfo);
router.get("/:id", orderController.getById);
router.get("/:id/users", orderController.getUser);

router.post("/", orderController.save);

module.exports = router;
