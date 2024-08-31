const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");
const authUserMiddleware = require("../../middlewares/authUserMiddleware");

const seller = express.Router();
seller.use(authUserMiddleware);
seller.use(modelMiddleware.modelMiddleware);

const sellerMiddleware = require("../../middlewares/sellerMiddleware");
const sellerService = require("../../services/admin/sellerService");

seller.get("/seller", [sellerMiddleware.getSellersMiddleware], sellerService.getSellersService);
seller.post("/seller", [sellerMiddleware.createSellerMiddleware], sellerService.createSellerService);
seller.get("/seller/:id", [sellerMiddleware.editSellersMiddleware], sellerService.editSellersService);
seller.post("/seller/:id", [sellerMiddleware.updateSellerMiddleware], sellerService.updateSellerService);
seller.delete("/seller/:id", [sellerMiddleware.deleteSellerMiddleware], sellerService.deleteSellerService);

module.exports = seller;