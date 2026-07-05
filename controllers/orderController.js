const Order = require('../models/order');

exports.createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    const newOrder = new Order({
      user: req.user.userId,
      items,
      totalAmount,
      shippingAddress
    });
    
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    next(error);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('items.product');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};