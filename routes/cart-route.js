const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart-controller");
const authorization = require("../middlewares/authorization");

router.use(authorization.authorizeToken);
router.use(authorization.authorizeRole(["customer"]));

router.get("/", cartController.getByUserId);

router.post("/", cartController.save);

module.exports = router;
