const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");

const order = express.Router();

order.use(modelMiddleware.modelMiddleware);

const orderMiddleware = require("../../middlewares/orderMiddleware");
const orderService = require("../../services/frontend/orderService");

order.post("/order/:userId", [orderMiddleware.createOrder], orderService.createOrderService );

module.exports = order