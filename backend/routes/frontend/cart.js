const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");

const cart = express.Router();

cart.use(modelMiddleware.modelMiddleware);

const cartMiddleware = require("../../middlewares/cartMiddleware");
const cartService = require("../../services/frontend/cartService");

cart.get("/cart/:userId", [cartMiddleware.getCart], cartService.getCartService );
cart.post("/cart/:userId", [cartMiddleware.createCart], cartService.createCartService );
cart.delete("/cart/:userId", [cartMiddleware.deleteCart], cartService.deleteCartService );

module.exports = cart;;