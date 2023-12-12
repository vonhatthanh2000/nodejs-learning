"use strict";

const express = require("express");
const { apiKey, checkPermission } = require("../auth/check-auth");
const router = express.Router();

// check api key
router.use(apiKey);

// check permission for this api key
router.use(checkPermission("0000"));

router.use("/v0/api", require("./access"));

module.exports = router;
