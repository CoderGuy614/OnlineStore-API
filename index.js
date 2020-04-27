// Packages
const express = require("express");

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

// Start

app.listen(process.env.PORT, () => {
  console.log(`Ready on port ${process.env.PORT}`);
});

module.exports = app;
