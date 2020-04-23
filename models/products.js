const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model("products", {
  photos: [String],
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    required: [true, "name is required"],
  },
  deliveryTime: {
    type: Number,
    required: [true, "delivery time is required"],
  },
  inStock: {
    type: Number,
    required: [true, "delivery time is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  options: {
    type: Array,
    required: [true, "options are required"],
  },
});
