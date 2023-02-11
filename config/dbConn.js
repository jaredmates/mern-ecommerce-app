const mongoose = require("mongoose");
const Product = require("../models/productModel.js");
const User = require("../models/userModel.js");
const Orders = require("../models/orderModel.js");
const data = require("../data/data.js");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to db");

    Product.countDocuments({}, async function (err, count) {
      if (!err && (count === 0 || count >= 50)) {
        await Product.deleteMany({});
        await Product.insertMany(data.products);
      }
    });

    User.countDocuments({}, async function (err, count) {
      if (!err && count === 0) {
        await User.deleteMany({});
        await User.insertMany(data.users);
        await Orders.deleteMany({});
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
