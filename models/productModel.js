const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
      unique: true,
    },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
      type: String,
      required: [true, "Please provide product category"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    price: { type: Number, required: [true, "Please provide product price"] },
    countInStock: { type: Number, required: true, default: 15 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
