const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');




// add products:
router.post('/add', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
            await cart.save();
        } else {
            cart = await Cart.create({ userId, items: [{ productId, quantity: 1 }] });
        }
        res.status(200).json({ success: true, message: "Added to cart", cart });
    } catch (error) {
        console.error("Cart Add Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});


// கார்ட் பொருட்களைப் பார்க்க(GET) - இங்கேயே சேர்த்துக்கொள்ளுங்கள்
router.get('/:userId', async (req, res) => {
    try {
        // populate மூலம் ப்ராடக்ட் விவரங்களை எடுக்கும்
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        res.status(200).json(cart ? cart : { items: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;