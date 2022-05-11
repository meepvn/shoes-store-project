const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);

module.exports = router;
