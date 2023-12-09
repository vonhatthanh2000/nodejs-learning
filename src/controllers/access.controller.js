"use strict";

const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    try {
      return res.status(201).json(await AccessService.signUp(req.body));
    } catch (error) {
      next(error);
      return res.status(500).json({
        code: "5000",
        metadata: "error",
      });
    }
  };
}

module.exports = new AccessController();
