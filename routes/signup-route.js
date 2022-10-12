const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signup-controller");
const { signupSchema } = require("../validations/signup-schema");
const validator = require("../middlewares/validator");

router.post("/", validator.validate(signupSchema), signupController.signup);

module.exports = router;
