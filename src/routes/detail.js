const orderDetailController = require("../controllers/OrderDetailController");
const express = require("express");
const router = express.Router();

router.get("/", orderDetailController.getAllDetails);
router.post("/", orderDetailController.AddOrderDetail);
module.exports = router;
