const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.delete("/:id", productController.deleteProduct);
router.put("/:id/", productController.updateProductByID);
router.get("/:id", productController.getProductByID);
router.post("/", productController.insertProduct);
router.get("/", productController.getAllProduct);

module.exports = router;
