const express = require("express");
const router = express.Router();
const userProductController = require("../controllers/user-product-controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const { userProductSchema } = require("../validations/user-product-schema");
const validator = require("../middlewares/validator");
const Roles = require("../utils/roles");

router.use(authentication.authenticateByToken);

router.get("/", authorization.authorizeByRole([Roles.ADMIN]), userProductController.getAll);
router.get("/products", authorization.authorizeByRole([Roles.SELLER]), userProductController.getProducts);
router.get("/:id", authorization.authorizeByRole([Roles.ADMIN]), userProductController.getAll);
router.get("/:userId/products", authorization.authorizeByRole([Roles.ADMIN]), userProductController.getAll);
router.get("/:productId/users", authorization.authorizeByRole([Roles.ADMIN]), userProductController.getAll);

router.post("/", authorization.authorizeByRole([Roles.SELLER]), validator.validate(userProductSchema), userProductController.save);

router.put("/", authorization.authorizeByRole([Roles.SELLER]), validator.validate(userProductSchema), userProductController.update);

router.delete("/:productId", authorization.authorizeByRole([Roles.SELLER]), userProductController.delete);

module.exports = router;
