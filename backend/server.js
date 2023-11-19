const express = require("express");
// const cors = require("cors");
// const path = require("path");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));