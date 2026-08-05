const mongoose = require('mongoose');

const getCart = async(req, res, next) => {
    const { userId } = req.params;
    
    if(!userId || userId.trim() === "" || !mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({ error: `User id is required and cannot be empty.` });
    }
    next();
};

const getCartProducts = async (req, res, next) => {
    const products = req.body;

    if (!Array.isArray(products)) {
        return res.status(400).json({ error: 'Request body must be an array.' });
    }

    for (const product of products) {
        if (!product.productId || typeof product.productId !== 'string' || !product.productId.trim()) {
            return res.status(400).json({ error: 'Each product must have a valid productId.' });
        }

        if (!Number.isInteger(product.quantity) || product.quantity <= 0) {
            return res.status(400).json({ error: 'Each product must have a positive integer quantity.' });
        }
    }

    next();
};

const createCart = async(req, res, next) => {
    const { productId, quantity } = req.body;
    const { userId } = req.params;
    
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid userId.' });
    }

    if (typeof productId !== 'string' || productId.trim() === '') {
        return res.status(400).json({ error: 'productId should be a non-empty string.' });
      }
    
      if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'quantity must be a positive number.' });
      }
    
    next();
};

const productQuantityUpdate = async(req, res, next) => {
    const { userId } = req.params || req.body;
    const { productId, quantity } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    if (quantity && isNaN(quantity)) {
        return res.status(400).json({ message: 'Quantity must be a number' });
    }
    next();
};

const deleteProductCart = async(req, res, next) => {
    const { userId } = req.params || req.body;
    const { productId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    next();
};


module.exports = {
    getCart,
    getCartProducts,
    createCart,
    productQuantityUpdate,
    deleteProductCart
}