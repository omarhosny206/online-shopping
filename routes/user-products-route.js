const express = require("express");
const router = express.Router();
const userProductsController = require("../controllers/user-products-controller");
const authorization = require("../middlewares/authorization");
const { userProductsSchema } = require("../validations/user-products-schema");
const validator = require("../middlewares/validator");
const Roles = require("../utils/roles");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole([Roles.ADMIN]), userProductsController.getAll);
router.get("/products", authorization.authorizeRole([Roles.SELLER]), userProductsController.getProducts);
router.get("/:id", authorization.authorizeRole([Roles.ADMIN]), userProductsController.getAll);
router.get("/:userId/products", authorization.authorizeRole([Roles.ADMIN]), userProductsController.getAll);
router.get("/:productId/users", authorization.authorizeRole([Roles.ADMIN]), userProductsController.getAll);

router.post("/", authorization.authorizeRole([Roles.SELLER]), validator.validate(userProductsSchema), userProductsController.save);

router.put("/", authorization.authorizeRole([Roles.SELLER]), validator.validate(userProductsSchema), userProductsController.update);

router.delete("/:productId", authorization.authorizeRole([Roles.SELLER]), userProductsController.delete);

module.exports = router;
