const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./src/public/images");
  },
  filename: (req, file, cb) => {
    console.log(req.query);
    cb(null, Date.now() + "-" + file.originalname);
    // } else {
    //   console.log(req.body);
    //   cb(null, `${req.body.TenSP.split(" ").join("-")}.jpg`);
    // }
  },
});
const upload = multer({ storage: storageEngine });

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
