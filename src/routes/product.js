const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const multer = require("multer");
const path = require("path");

const storageEngine = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./src/public/images");
  },
  filename: (req, file, cb) => {
    console.log(req.query);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storageEngine,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

router.delete("/:id", productController.deleteProduct);
router.put(
  "/:id/",
  upload.single("productImage"),
  productController.updateProductByID
);
router.get("/:id", productController.getProductByID);
router.post(
  "/",
  upload.single("productImage"),
  productController.insertProduct
);
router.get("/", productController.getAllProduct);

module.exports = router;
