const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");

const router = require("./routes");
db.connect();

app.use("/api", router);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use((req, res, next) => {
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "*");
    next();
  });

  app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));


app.get("*", (req, res) => {
    try {
      res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
    } catch (e) {
      res.send("Oops! unexpected error");
    }
  });

  app.use(cors());

  app.listen(process.env.PORT || 80, () => {
    console.log(`Listening on port no 80`);
  });