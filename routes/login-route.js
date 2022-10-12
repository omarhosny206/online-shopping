const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login-controller");
const { loginSchema } = require("../validations/login-schema");
const validator = require("../middlewares/validator");

router.post("/", validator.validate(loginSchema), loginController.login);

module.exports = router;
