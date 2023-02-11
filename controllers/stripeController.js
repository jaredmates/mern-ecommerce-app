const Stripe = require("stripe");
const Order = require("../models/orderModel.js");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// @desc   Handle Stripe Payment [OrderPage.js]
// @route  GET /stripe/secret/:id
// @access Public
const handleStripePayment = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "_id name email"
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.totalPrice * 100,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });

  res.json({ order, client_secret: paymentIntent.client_secret });
};

// @desc   Get Stripe Key [OrderPage.js]
// @route  GET /stripe/key
// @access Public
const handleStripeKey = (req, res) => {
  res.json(process.env.STRIPE_PUBLISHABLE_KEY);
};

module.exports = { handleStripePayment, handleStripeKey };
