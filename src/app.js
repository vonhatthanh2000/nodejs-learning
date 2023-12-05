const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// morgan("combined")
// morgan("common")
// morgan("short")
// morgan("tiny")

// init db
require("./dbs/init.mongodb");

// init routes
app.get("/", (req, res, next) => {
  const strCompress = "Hello";
  return res.status(200).json({
    message: "Hello World",
  });
});
// handling

module.exports = app;
