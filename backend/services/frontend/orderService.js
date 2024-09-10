const orderDao = require("../../Dao/frontend/orderDao")

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
    createOrderService
};