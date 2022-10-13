const express = require("express");
const router = express.Router();
const userProductsController = require("../controllers/user-products-controller");
const authorization = require("../middlewares/authorization");
const { userProductsSchema } = require("../validations/user-products-schema");
const validator = require("../middlewares/validator");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole(["admin"]), userProductsController.getAll);
router.get("/products", authorization.authorizeRole(["seller"]), userProductsController.getProducts);
router.get("/:id", authorization.authorizeRole(["admin"]), userProductsController.getAll);
router.get("/:userId/products", authorization.authorizeRole(["admin"]), userProductsController.getAll);
router.get("/:productId/users", authorization.authorizeRole(["admin"]), userProductsController.getAll);

router.post("/", authorization.authorizeRole(["seller"]), validator.validate(userProductsSchema), userProductsController.save);

router.put("/", authorization.authorizeRole(["seller"]), validator.validate(userProductsSchema), userProductsController.update);

router.delete("/:productId", authorization.authorizeRole(["seller"]), userProductsController.delete);

module.exports = router;
