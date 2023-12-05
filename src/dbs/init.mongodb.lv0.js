"use strict";

const mongoose = require("mongoose");

const connectString = "mongodb://localhost:27017/thanhDev";

mongoose
  .connect(connectString)
  .then((_) => {
    console.log("Connect mongodb successfully");
  })
  .catch((err) => {
    console.log("Connect mongodb failure");
  });

// dev

if (1 == 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
