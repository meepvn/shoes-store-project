const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.post('/create',productController.insertProduct)
router.delete('/:id',productController.deleteProduct);
router.put('/:id/edit',productController.updateProductByID);
router.get('/:id',productController.getProductByID);
router.get('/',productController.getAllProduct);

module.exports = router;