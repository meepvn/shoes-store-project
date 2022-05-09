const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.post("/detail", orderController.AddOrderDetail);
router.get("/", orderController.getAllOrders);
router.post("/", orderController.createOrder);

module.exports = router;
