const express = require("express");
const router = require("express").Router();
const orders = require("../models/orders");

router.get("/", (req, res) => {
  orders
    .find({})
    .lean()
    .then((data) => res.send(data));
});

router.post("/", (req, res) => {
  orders.create(req.body).then((data) => res.send(data));
});
module.exports = router;
