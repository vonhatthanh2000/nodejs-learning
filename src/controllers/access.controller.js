"use strict";

class AccessController {
  signUp = async (req, res, next) => {
    try {
      return res.status(200).json({
        code: "2000",
        metadata: "success",
      });
    } catch (error) {
      return res.status(500).json({
        code: "5000",
        metadata: "error",
      });
    }
  };
}

module.exports = new AccessController();
