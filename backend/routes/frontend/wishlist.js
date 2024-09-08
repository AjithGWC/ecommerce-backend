const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");

const wishlist = express.Router();

wishlist.use(modelMiddleware.modelMiddleware);

const wishlistMiddleware = require("../../middlewares/wishlistMiddleware");
const wishlistService = require("../../services/frontend/wishlistService");

wishlist.get("/wishlist/:userId", [wishlistMiddleware.getWishlist], wishlistService.getWishlistService );
wishlist.post("/wishlist/add/:userId", [wishlistMiddleware.addWishlist], wishlistService.addWishlistService );
wishlist.post("/wishlist/remove/:userId", [wishlistMiddleware.removeWishlist], wishlistService.removeWishlistService );

module.exports = wishlist;