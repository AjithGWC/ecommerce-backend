const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");
const authUserMiddleware = require("../../middlewares/authUserMiddleware");

const seller = express.Router();
seller.use(modelMiddleware.modelMiddleware);

const sellerMiddleware = require("../../middlewares/sellerMiddleware");
const sellerService = require("../../services/admin/sellerService");

seller.get("/seller", [sellerMiddleware.getSellersMiddleware], sellerService.getSellersService);
seller.post("/seller", [authUserMiddleware, sellerMiddleware.createSellerMiddleware], sellerService.createSellerService);
seller.get("/seller/:id", [sellerMiddleware.editSellersMiddleware], sellerService.editSellersService);
seller.post("/seller/:id", [authUserMiddleware, sellerMiddleware.updateSellerMiddleware], sellerService.updateSellerService);
seller.delete("/seller/:id", [sellerMiddleware.deleteSellerMiddleware], sellerService.deleteSellerService);

module.exports = seller;