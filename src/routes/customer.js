const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const customerController = require('../controllers/CustomerController');

router.post('/create',customerController.insertCustomer)
router.delete('/:id',customerController.deleteCustomer);
router.put('/:id/edit',customerController.updateCustomerByID);
router.get('/:id',customerController.getCustomerByID);
router.get('/',customerController.getAllCustomer);

module.exports = router;