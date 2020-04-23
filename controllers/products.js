//Get models here.
//Categories
//products
const categories = require("../models/categories");
const products = require("../models/products");
// const options = require("../models/options");
const router = require("express").Router();

const getMinPrice = (options) => {
  let prices = [];
  options.forEach((el) => {
    prices.push(el.price);
  });
  return prices.sort((a, b) => a - b)[0];
};

router.get("/", (req, res) => {
  products
    .find({})
    .lean()
    .then((data) => {
      data.forEach((product) => {
        product.minPrice = getMinPrice(product.options);
      });
      res.send(data);
    });
});

router.get("/:id", (req, res) => {
  products
    .findById(req.params.id)
    .populate("categories")
    .lean()
    .then((dat) => res.send(dat));
});

router.post("/", (req, res) => {
  //read data from the body of the request and post it here.
  products.create(req.body).then((dat) => res.send(dat));
});

router.patch("/:id", (req, res) => {
  products
    .findByIdAndUpdate(req.params.id, req.body)
    .then((dat) => res.send(dat))
    .catch((err) => res.send(err));
});

router.delete("/:id", (req, res) => {
  products
    .delete(req.params.id)
    .then((dat) => res.send(dat))
    .catch((err) => res.send(err));
});

module.exports = router;
