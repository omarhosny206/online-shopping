const express = require("express");
const router = express.Router();
const userProductsController = require("../controllers/user-products-controller");
const authorization = require("../middlewares/authorization");
const { userProductsSchema } = require("../validations/user-products-schema");
const validator = require("../middlewares/validator");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole(["admin"]), userProductsController.getAll);

router.post("/", authorization.authorizeRole(["seller"]), validator.validate(userProductsSchema), userProductsController.save);

module.exports = router;
