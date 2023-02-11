const express = require("express");
const router = express.Router();

const stripeController = require("../controllers/stripeController.js");

router.get("/secret/:id", stripeController.handleStripePayment);
router.get("/key", stripeController.handleStripeKey);

module.exports = router;
