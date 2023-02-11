const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth.js");
const isAdmin = require("../middleware/isAdmin.js");

const orderController = require("../controllers/orderController.js");

router.get("/", isAuth, isAdmin, orderController.getAllOrders);
router.get("/mine", isAuth, orderController.getMyOrder);
router.get("/summary", isAuth, isAdmin, orderController.getOrderSummary);
router.get("/:id", isAuth, orderController.getOrder);

router.post("/", isAuth, orderController.createNewOrder);

router.put("/:id/pay", isAuth, orderController.updateOrder);
router.put("/:id/deliver", isAuth, orderController.deliverOrder);

router.delete("/:id", isAuth, isAdmin, orderController.deleteOrder);

module.exports = router;
