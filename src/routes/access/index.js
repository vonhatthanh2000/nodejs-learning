const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");

router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello World 123",
  });
});

// signUP

router.post("/shop/signup", accessController.signUp);

module.exports = router;
