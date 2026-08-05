const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");

const order = express.Router();

order.use(modelMiddleware.modelMiddleware);

const orderMiddleware = require("../../middlewares/orderMiddleware");
const orderService = require("../../services/frontend/orderService");

order.get("/order", orderService.getOrdersService );
order.get("/order/id/:orderId", [orderMiddleware.getOrderByOrderId], orderService.getOrderByOrderIdService);
order.get("/order/:userId", [orderMiddleware.getOrderByUser], orderService.getOrderByUserService );
order.post("/order/:userId", [orderMiddleware.createOrder], orderService.createOrderService );

module.exports = order;