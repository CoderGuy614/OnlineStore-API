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
  const numOfItems = data.filteredOptions.length;

  const items = data.filteredOptions.map(
    (obj) =>
      "Item Name: " +
      obj.item +
      ", " +
      obj.name +
      ", " +
      "Price: $ " +
      obj.price
  );

  const mailOptionsCustomer = {
    from: "CamboCraftClothing@gmail.com",
    to: data.email,
    subject: "CamboCraft Clothing -- ORDER CONFIRMATION --",
    html:
      `<h2> Hello ${data.name}!</h2>
        <h2>Thank you for your order!  We have received your information and will contact you to arrange a convenient delivery.</h2>
        
        <h3> Your Order Contains ${numOfItems} Items </h3>

        <ul>` +
      items.map((i) => `<li>` + i + `</li>` + `</ul>`) +
      `<h3>Your Order Total is: $ ${data.totalPrice}</h3>

        <h3> Your Contact Information:  </h3>

        <p> Name: ${data.name} </p>
        <p> Email: ${data.email}</p>
        <p> Phone: ${data.phone}</p>
        <p> Location: ${data.location}</p>
        
        <h3> Thank You </h3>`,
  };

  const mailOptionsSeller = {
    from: "CamboCraftClothing@gmail.com",
    to: "cambocraftclothing@gmail.com",
    subject: "NEW ORDER RECEIVED",
    html:
      `<h4> Customer Name: ${data.name}</h4>
    <h4> Customer Email: ${data.email}</h4>
    <h4> Customer Phone: ${data.phone}</h4>
    <h4> Customer Location: ${data.location}</h4>
    <h4> Customer Message: ${data.message}</h4>
    <h4> ORDER ITEMS: </h4> 
    <ul>` +
      items.map((i) => `<li>` + i + `</li>` + `</ul>`) +
      `<h3>Your Order Total is: $ ${data.totalPrice}</h3>`,
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
