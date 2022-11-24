const express = require("express");
const router = express.Router();
const userProductController = require("../controllers/user-product-controller");
const authorization = require("../middlewares/authorization");
const { userProductSchema } = require("../validations/user-product-schema");
const validator = require("../middlewares/validator");
const Roles = require("../utils/roles");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole([Roles.ADMIN]), userProductController.getAll);
router.get("/products", authorization.authorizeRole([Roles.SELLER]), userProductController.getProducts);
router.get("/:id", authorization.authorizeRole([Roles.ADMIN]), userProductController.getAll);
router.get("/:userId/products", authorization.authorizeRole([Roles.ADMIN]), userProductController.getAll);
router.get("/:productId/users", authorization.authorizeRole([Roles.ADMIN]), userProductController.getAll);

router.post("/", authorization.authorizeRole([Roles.SELLER]), validator.validate(userProductSchema), userProductController.save);

router.put("/", authorization.authorizeRole([Roles.SELLER]), validator.validate(userProductSchema), userProductController.update);

router.delete("/:productId", authorization.authorizeRole([Roles.SELLER]), userProductController.delete);

module.exports = router;
