const mongoose = require('mongoose');

const getWishlist = async(req, res, next) => {
    const { userId } = req.params;
    
    if(!userId || userId.trim() === "" || !mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({ error: `User id is required and cannot be empty.` });
    }
    next();
};

const addWishlist = async(req, res, next) => {
    const product = req.body;

    if (!product.productId ) {
        return res.status(400).json({ error: 'Each product must have a valid productId.' });
    }
    next();
};

const removeWishlist = async(req, res, next) => {
    const product = req.body;

    if (!product.productId ) {
        return res.status(400).json({ error: 'Each product must have a valid productId.' });
    }
    next();
};

module.exports = {
    getWishlist,
    addWishlist,
    removeWishlist
}