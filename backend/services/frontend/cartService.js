const cartDao = require("../../Dao/frontend/cartDao");

const getCartService = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cart = await cartDao.getCart({ userId });
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const createCartService = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const { userId } = req.params;
        const cart = await cartDao.createCart({ userId, productId, quantity });
        return res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const deleteCartService = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        const cart = await cartDao.deleteCart({ userId, productId });
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    getCartService,
    createCartService,
    deleteCartService,
};
