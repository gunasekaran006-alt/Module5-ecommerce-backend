const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authorizeUser } = require('../middleware/authMiddleware');

router.post('/', authorizeUser, orderController.createOrder);
router.get('/myorders', authorizeUser, orderController.getMyOrders);

module.exports = router;