const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");

router.get("/find/:name", customerController.getCustomerByNameRelatively);
router.delete("/:id", customerController.deleteCustomer);
router.put("/:id/", customerController.updateCustomerByID);
router.get("/:id", customerController.getCustomerByID);
router.post("/", customerController.insertCustomer);
router.get("/", customerController.getAllCustomer);

module.exports = router;
