const express = require("express");
const morgan = require("morgan");
const router = require("./router/index");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);

module.exports = app;
