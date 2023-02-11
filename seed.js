require("dotenv").config({ path: "./config/.env" });

const Product = require("./models/productModel.js");
const User = require("./models/userModel.js");
const Orders = require("./models/orderModel.js");
const data = require("./data/data.js");
const connectDB = require("./config/dbConn");

// Connect to database
connectDB();

const seedData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(data.products);

    await User.deleteMany({});
    await User.insertMany(data.users);

    await Orders.deleteMany({});

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

seedData();
