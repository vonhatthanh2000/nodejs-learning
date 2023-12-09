"use strict";

const JWT = require("jsonwebtoken");

const createPairToken = async (payload, publicKey, privateKey) => {
  try {
    // Create access token

    const accessToken = await JWT.sign(payload, publicKey, {
      // algorithm: "RS256",
      expiresIn: "2 days",
    });
    // Create access token
    const refreshToken = await JWT.sign(payload, privateKey, {
      // algorithm: "RS256",
      expiresIn: "7 days",
    });
    // Verify
    JWT.verify(accessToken, publicKey, (error, decode) => {
      if (error) {
        console.log("error verify", error);
      } else {
        console.log("decode verify", decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    return {
      code: "xxx",
      error,
    };
  }
};

module.exports = {
  createPairToken,
};
