const router = require("express").Router();
// const express = require('express');
// const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
// const cors = require('cors');

router.post("/", (req, res) => {
  const data = req.body;

  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
      user: "cambocraftclothing@gmail.com",
      pass: "CamboCraft69",
    },
  });

  const mailOptionsCustomer = {
    from: "CamboCraftClothing@gmail.com",
    to: data.email,
    subject: "CamboCraft Clothing -- ORDER CONFIRMATION --",
    html: `<h4> Hello ${data.name}!</h4>
        <p>Thank you for your order!  We have received your information and will contact you to arrange a convenient delivery.</p>`,
  };

  const items = data.cartProducts.map(
    (obj, index) =>
      obj.name +
      " " +
      data.filteredOptions[index].name +
      " " +
      "$ " +
      data.filteredOptions[index].price
  );

  const mailOptionsSeller = {
    from: "CamboCraftClothing@gmail.com",
    to: "cambocraftclothing@gmail.com",
    subject: "NEW ORDER RECEIVED",
    html: `<h4> Customer Name: ${data.name}!</h4>
    <h4> Customer Email: ${data.email}!</h4>
    <h4> Customer Phone: ${data.phone}!</h4>
    <h4> Customer Location: ${data.location}!</h4>
    <h4> Customer Message: ${data.message}!</h4>
    <h4> Order Items </h4>
    <ul> 
    ${items.map((item) => `<li> ${item} </li>`)}
    </ul>
    `,
  };

  smtpTransport.sendMail(mailOptionsCustomer, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
    smtpTransport.close();
  });

  smtpTransport.sendMail(mailOptionsSeller, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
    smtpTransport.close();
  });
});

module.exports = router;
