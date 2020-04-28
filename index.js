// Packages
const express = require("express");
const path = require("path");

require("dotenv").config();

// Server

const app = express();
const database = require("./database");

// Middleware
//
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const nodemailer = require("nodemailer");

const cors = require("cors");
app.use(cors({ credentials: true }));
app.use(cors());

// Routes

app.use("/products", require("./controllers/products.js"));
app.use("/categories", require("./controllers/categories.js"));
app.use("/confirmation", require("./controllers/confirmation.js"));
app.use("/orders", require("./controllers/orders.js"));
app.use("/users", require("./controllers/users"));
app.use("/auth", require("./controllers/auth"));

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Start

app.listen(process.env.PORT, () => {
  console.log(`Ready on port ${process.env.PORT}`);
});

module.exports = app;
