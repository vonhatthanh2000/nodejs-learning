const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");

// signUP

router.post("/shop/signup", accessController.signUp);

module.exports = router;
