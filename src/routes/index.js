"use strict";

const express = require("express");
const router = express.Router();

router.use("/v0/api", require("./access"));

module.exports = router;
