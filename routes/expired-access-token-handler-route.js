const express = require("express");
const router = express.Router();
const expiredAccessTokenHandler = require("../middlewares/expired-access-token-handler");

router.post("/", expiredAccessTokenHandler.regenerateAccessToken);

module.exports = router;
