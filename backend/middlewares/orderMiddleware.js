const mongoose = require('mongoose');

const createOrder = async(req, res, next) => {
    const { userId } = req.params;
    const { products, shipping, total } = req.body;

    if (!userId || userId.trim() === "" || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid or missing user ID" });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "Products field must be a non-empty array" });
    }

    for (let product of products) {
        if (!product.productId || !mongoose.Types.ObjectId.isValid(product.productId)) {
            return res.status(400).json({ error: "Each product must have a valid productId" });
        }

        if (!product.quantity || typeof product.quantity !== 'number' || product.quantity <= 0) {
            return res.status(400).json({ error: "Each product must have a valid quantity greater than 0" });
        }
    }

    if (!shipping || typeof shipping !== 'number' || shipping <= 0) {
        return res.status(400).json({ error: "Shipping cost must be a positive number" });
    }

    if (!total || typeof total !== 'number' || total <= 0) {
        return res.status(400).json({ error: "Total amount must be a positive number" });
    }

    next();
};

module.exports = {
    createOrder
}