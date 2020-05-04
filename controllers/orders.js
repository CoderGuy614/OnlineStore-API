const express = require("express");
const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const orders = require("../models/orders");

router.get("/", (req, res) => {
  orders
    .find({})
    .lean()
    .then((data) => res.send(data));
});

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check("phone", "Please enter a valid phone number ").not().isEmpty(),
    check(
      "location",
      "Please enter a delivery location, i.e. hotel name and room number"
    )
      .not()
      .isEmpty(),
    check("filteredOptions", "Please choose at lease one item to order")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      location,
      message,
      cartProducts,
      filteredOptions,
      totalPrice,
    } = req.body;

    try {
      const newOrder = await orders.create({
        name,
        email,
        phone,
        location,
        message,
        cartProducts,
        filteredOptions,
        totalPrice,
      });
      res.json(newOrder);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
