const router = require("express").Router();
// const express = require('express');
// const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
// const cors = require('cors');

router.post("/", (req, res) => {
  const data = req.body;
  console.log(data);

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

  const mailOptionsCustomer = {
    from: "CamboCraftClothing@gmail.com",
    to: data.email,
    subject: "CamboCraft Clothing -- ORDER CONFIRMATION --",
    html: `<h4> Hello ${data.name}!</h4>
        <p>Thank you for your order!  We have received your information and will contact you to arrange a convenient delivery.</p>
        <h4>Your Order Total is ${data.totalPrice}</h4>

        <h4> Your Contact Information </p>
        <p> Name: ${data.name} </p>
        <p> Email: ${data.email}</p>
        <p> Phone: ${data.phone}</p>
        <p> Location: ${data.location}</p>
        <p> Message: ${data.message}</p>
        <h4> Your order contains ${numOfItems} items </h4>
        <h4> Total Price: ${data.totalPrice}</h4>
        <p>${data.filteredOptions[0].item} ${data.filteredOptions[0].name} ${data.filteredOptions[0].price} </p>
        
        `,
  };

  const mailOptionsSeller = {
    from: "CamboCraftClothing@gmail.com",
    to: "cambocraftclothing@gmail.com",
    subject: "NEW ORDER RECEIVED",
    html: `<h4> Customer Name: ${data.name}</h4>
    <h4> Customer Email: ${data.email}</h4>
    <h4> Customer Phone: ${data.phone}</h4>
    <h4> Customer Location: ${data.location}</h4>
    <h4> Customer Message: ${data.message}</h4>
    <h4> Total Price: ${data.totalPrice}</h4>
    <p>${data.filteredOptions[0].item} ${data.filteredOptions[0].name} ${data.filteredOptions[0].price} </p>
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
