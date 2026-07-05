const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authorizeUser, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/', productController.getAllProducts);
router.post('/', authorizeUser, authorizeAdmin, productController.createProduct);

module.exports = router;