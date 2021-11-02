const express = require("express");
const { getDataController } = require("./controller.js");
const { checkForRateLimit } = require("./middleware.js");
const router = new express.Router();

router.get("/getData", checkForRateLimit, getDataController);

module.exports = { router };
