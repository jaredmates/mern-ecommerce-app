const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./config/.env" });
require("express-async-errors");

const errorHandler = require("./middleware/errorHandler");

const connectDB = require("./config/dbConn");

const stripeRouter = require("./routes/stripeRoutes.js");
const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
const uploadRouter = require("./routes/uploadRoutes.js");

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// Paypal
app.get("/api/keys/paypal", (req, res) => {
  res.json(process.env.PAYPAL_CLIENT_ID || "sb");
});

// Stripe
app.use("/api/stripe", stripeRouter);

// Routes
app.use("/api/upload", uploadRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// Error Handler
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
app.use(errorHandler);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.json("Please set to production"));
}

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} in mode: ${process.env.NODE_ENV}`)
);
