"use strict";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const { findById } = require("../services/api-key.service");

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) {
      return res.status(401).json({
        code: "401",
        message: "Unauthorized",
      });
    }

    // check objKey in db
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(401).json({
        code: "403",
        message: "Forbidden Error",
      });
    }

    req.apiKey = objKey;
    return next();
  } catch (error) {}
};

const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.apiKey.permissions) {
      return res.status(403).json({
        code: "403",
        message: "Permission Denied",
      });
    }
    const validPermission = req.apiKey.permissions.includes(permission);
    if (!validPermission)
      return res.status(403).json({
        code: "403",
        message: "Permission Denied",
      });
    return next();
  };
};

module.exports = {
  apiKey,
  checkPermission,
};
