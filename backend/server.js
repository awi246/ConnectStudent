const express = require("express");
const appRootPath = require("app-root-path");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");
const router = require("./routes");
const PORT = process.env.PORT || 90; // Use environment variable for port or default to 90


// Database connection
db.connect();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// CORS
app.use(cors());

// Routes
app.use("/api", router);

// Serve uploads directory for local development
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

app.use(express.static(appRootPath + "/"));

// Serve the frontend code directly for local development
app.use(express.static(path.join(__dirname, "/../frontend")));

// Server listening
app.listen(PORT, () => {
  console.log(`Listening on port no ${PORT}`);
});
