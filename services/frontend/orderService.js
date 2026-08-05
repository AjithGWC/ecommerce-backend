const orderDao = require("../../Dao/frontend/orderDao");

const getOrdersService = async (req, res, next) => {
    try{
        const { orderId } = req.params;
        const orders = await orderDao.getOrdersDao({ orderId });
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getOrderByOrderIdService = async (req, res, next) => {
    try{
        const { orderId } = req.params;
        const orders = await orderDao.getOrdersByOrderIdDao({ _id: orderId });
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getOrderByUserService = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const orders = await orderDao.getOrderByUserDao({ userId });
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const createOrderService = async (req, res, next) => {    
    try {
        const { userId } = req.params;
        const { products, shipping, total } = req.body;
        const savedOrder = await orderDao.orderCreateDao({ userId, products, shipping, total });
        return res.status(200).json(savedOrder);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    getOrdersService,
    getOrderByOrderIdService,
    getOrderByUserService,
    createOrderService
};