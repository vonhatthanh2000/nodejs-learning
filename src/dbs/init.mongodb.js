"use strict";

const mongoose = require("mongoose");

const {
  db: { host, port, name },
} = require("../configs/config.mongodb");

class Database {
  constructor() {
    this.connect();
  }

  // connect
  connect(type = "mongodb") {
    if (1 == 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    const connectString = `mongodb://${host}:${port}/${name}`;
    console.log("connectString :>> ", connectString);
    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then((_) => {
        console.log("Connect mongodb successfully");
      })
      .catch((err) => {
        console.log("Connect mongodb failure");
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return this.instance;
  }
}

const instanceMongoDb = Database.getInstance();
module.exports = instanceMongoDb;
