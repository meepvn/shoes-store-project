const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: (req, res, cb) => {
    console.log(req.body);
    cb(null, "./src/public/images");
  },
  filename: (req, file, cb) => {
    console.log(req.query);
    if (!req.body.TenSP) {
      cb(null, Date.now() + "-" + file.originalname);
    } else {
      cb(null, `${req.body.TenSP.split(" ").join("-")}`);
    }
  },
});
const upload = multer({ storage: storageEngine });

router.delete("/:id", productController.deleteProduct);
router.put("/:id/", productController.updateProductByID);
router.get("/:id", productController.getProductByID);
router.post("/", upload.single("product"), productController.insertProduct);
router.get("/", productController.getAllProduct);

module.exports = router;
