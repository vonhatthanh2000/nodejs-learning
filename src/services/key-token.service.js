"use strict";

const keyTokenModel = require("../models/key-token.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const token = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });

      return token || null;
    } catch (error) {
      return {
        code: "4000",
        metadata: error.message,
      };
    }
  };
}

module.exports = KeyTokenService;
