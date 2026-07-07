const Cart = require('../models/Cart'); 

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        // console.log("Adding to cart:", userId, productId);
        console.log("Received Data:", { userId, productId }); 
        
        if (!userId || !productId) {
            return res.status(400).json({ message: "Missing data" });
        }

        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId.toString());
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
            await cart.save();
        } else {
            // New cart Generate:
            cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
            await cart.save();
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        console.log("Cart found in DB:", cart); 
        res.status(200).json(cart ? cart : { items: [] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Particular item remove:
            cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());
            await cart.save();
            res.status(200).json({ success: true, message: "Removed from cart", cart });
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};