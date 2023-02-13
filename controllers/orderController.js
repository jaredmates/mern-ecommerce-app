const Order = require("../models/orderModel.js");
const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const expressAsyncHandler = require("express-async-handler");
const payOrderEmailTemplate = require("../utils/payOrderEmailTemplate.js");
const nodemailer = require("nodemailer");

// @desc   Get all orders [OrderListPage.js]
// @route  GET /api/orders
// @access Public
const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name");

  // If no orders
  if (!orders) {
    return res.status(204).json({ message: "No orders found." });
  }
  res.json(orders);
});

// @desc   Get my orders [OrderHistoryPage.js]
// @route  GET /api/orders/mine
// @access Public
const getMyOrder = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// @desc   Get order summary [DashboardPage.js]
// @route  GET /api/orders/summary
// @access Public
const getOrderSummary = expressAsyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);

  const users = await User.aggregate([
    {
      $group: {
        _id: null,
        numUsers: { $sum: 1 },
      },
    },
  ]);

  const dailyOrders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        orders: { $sum: 1 },
        sales: { $sum: "$totalPrice" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const productCategories = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({ users, orders, dailyOrders, productCategories });
});

// @desc   Get a single order [OrderListPage.js, OrderPage.js]
// @route  GET /api/orders/:id
// @access Public
const getOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    return res.status(404).json({ message: "Order Not Found" });
  }
});

// @desc   Create new order [PlaceOrderPage.js]
// @route  POST /api/orders
// @access Public
const createNewOrder = expressAsyncHandler(async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });

  const order = await newOrder.save();
  res.status(201).json({ message: "New Order Created", order });
});

// @desc   Update order [OrderPage.js]
// @route  PATCH /api/orders/:id/pay
// @access Public
const updateOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "email name"
  );

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    // Update order
    const updatedOrder = await order.save();

    // SEND ORDER CONFIRMATION EMAIL
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        // Generate new user info from Ethereal website
        user: "vida.hane@ethereal.email",
        pass: "9eZdG9297jG5wc3UdC",
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Fear of Monkey" <fearofmonkey@gmail.com>',
      to: `${order.user.name} <${order.user.email}>`,
      subject: `New order ${order._id}`,
      html: payOrderEmailTemplate(order),
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.json({ message: "Order Paid", order: updatedOrder });
  } else {
    return res.status(404).json({ message: "Order Not Found" });
  }
});

// @desc   Update delivery order [OrderPage.js]
// @route  PATCH /api/orders/:id/deliver
// @access Public
const deliverOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    res.json({ message: "Order Delivered" });
  } else {
    res.status(404).json({ message: "Order Not Found" });
  }
});

// @desc   Delete an order [OrderListPage.js]
// @route  DELETE /api/orders/:id
// @access Public
const deleteOrder = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Order ID Required" });
  }

  // Does the order exist to delete?
  const order = await Order.findById(id).exec();
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Delete Order
  const result = await order.remove();

  const reply = `Order with ID ${result._id} deleted`;
  res.json(reply);
});

module.exports = {
  createNewOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  deliverOrder,
  getMyOrder,
  getOrderSummary,
};
