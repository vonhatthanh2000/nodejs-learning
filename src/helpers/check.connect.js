"use strict";

const mongoose = require("mongoose");
const process = require("process");
const os = require("os");

const _SECONDS = 5000;

const connectCount = () => {
  const conNum = mongoose.connections.length;
  console.log("Connect count: ", conNum);
  return conNum;
};

// check overload function
const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memUsage = process.memoryUsage().rss;

    console.log("number of usage connection: ", numConnection);
    console.log("memory usage: ", memUsage / 1024 / 1024, "MB");

    // assume that maximum connections per 1 core is 5
    const maxConnection = 5 * numCores;

    if (numConnection > maxConnection) {
      console.log("connection overload detected");
    }
  }, _SECONDS);
};

module.exports = { connectCount, checkOverload };
