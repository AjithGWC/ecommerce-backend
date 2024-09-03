const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");

const cart = express.Router();

cart.use(modelMiddleware.modelMiddleware);

const cartMiddleware = require("../../middlewares/cartMiddleware");
const cartService = require("../../services/admin/cartService");

cart.get("/cart/:id", [cartMiddleware.getCart], cartService.getCartService );
cart.post("/cart/:id", [cartMiddleware.createCart], cartService.createCartService );