const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category-controller");
const authorization = require("../middlewares/authorization");
const { categorySchema } = require("../validations/category-schema");
const validator = require("../middlewares/validator");

router.use(authorization.authorizeToken);

router.get("/", authorization.authorizeRole(["admin"]), categoryController.getAll);
router.get("/search", authorization.authorizeRole(["admin", "seller", "customer"]), categoryController.search);
router.get("/:id", authorization.authorizeRole(["admin", "seller"]), categoryController.getById);
router.post("/", authorization.authorizeRole(["admin", "seller"]), validator.validate(categorySchema), categoryController.save);
module.exports = router;
