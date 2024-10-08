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

const getCartProductsService = async (req, res, next) => {
    try {
      const products = req.body; 
      const cart = await cartDao.getCartProducts({ products });
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

const productQuantityUpdateService = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const { userId } = req.params;
        const cart = await cartDao.productQuantityUpdate({ userId, productId, quantity });
        return res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const deleteProductCartService = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        const cart = await cartDao.deleteProductCart({ userId, productId });
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    getCartService,
    getCartProductsService,
    createCartService,
    productQuantityUpdateService,
    deleteProductCartService,
};
