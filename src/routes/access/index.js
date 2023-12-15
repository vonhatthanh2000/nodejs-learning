const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/check-auth");

// signUP

router.post("/shop/signup", asyncHandler(accessController.signUp));

module.exports = router;
