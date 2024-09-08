const wishlistDao = require("../../Dao/frontend/wishlistDao");

const getWishlistService = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const wishlist = await wishlistDao.getWishlist({ userId });
        return res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const addWishlistService = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        const wishlist = await wishlistDao.addWishlist({ userId, productId });        
        return res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const removeWishlistService = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        const wishlist = await wishlistDao.removeWishlist({ userId, productId });
        return res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    getWishlistService,
    addWishlistService,
    removeWishlistService
}