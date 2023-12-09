"use strict";

const shopModel = require("../models/shop.model");
const { RoleShop } = require("../constants/roles");
const KeyTokenService = require("./key-token.service");
const { createPairToken } = require("../auth/auth-utils");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { getInfoData } = require("../utils");

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step 1: check if email exists
      const shopHolder = await shopModel.findOne({ email }).lean();
      if (shopHolder) {
        return {
          code: "4000",
          message: "Email already exists",
        };
      }
      // create new shop holder
      const passwordHash = await bcrypt.hash(password, 10); // 10 is salt
      // salt is complexity of the hash
      // if salt is large, it will use more cpu to hash
      const newShopHolder = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      // if create success, return token
      if (newShopHolder) {
        // create private, public key
        // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });

        const publicKey = crypto.randomBytes(64).toString("hex");
        const privateKey = crypto.randomBytes(64).toString("hex");

        console.log({ publicKey, privateKey });

        // create publicKey
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShopHolder._id,
          publicKey,
          privateKey,
        });

        if (!keyStore) {
          return {
            code: "xxx",
            message: "fail to create tokens",
          };
        }

        // const publicKeyObject = crypto.createPublicKey(publicKeyString);

        // console.log("publicKeyObject :>> ", publicKeyObject);
        // create token pair for shop user
        const tokens = await createPairToken(
          {
            userId: newShopHolder._id,
            email: newShopHolder.email,
          },
          publicKey,
          privateKey
        );

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fileds: ["_id", "name", "email"],
              object: newShopHolder,
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "5000",
        message: error.message,
      };
    }
  };
}

module.exports = AccessService;
