const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");

const cart = express.Router();

cart.use(modelMiddleware.modelMiddleware);

const cartMiddleware = require("../../middlewares/cartMiddleware");
const cartService = require("../../services/frontend/cartService");

cart.get("/cart/:userId", [cartMiddleware.getCart], cartService.getCartService );
cart.post("/cart/products", [cartMiddleware.getCartProducts], cartService.getCartProductsService);
cart.post("/cart/:userId", [cartMiddleware.createCart], cartService.createCartService );
cart.patch("/cart/product-update/:userId", [cartMiddleware.createCart], cartService.createCartService );
cart.delete("/cart/product/:userId", [cartMiddleware.deleteCart], cartService.deleteCartService );

module.exports = cart;