const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");

const seller = express.Router();
seller.use(modelMiddleware.modelMiddleware);

const sellerMiddleware = require("../../middlewares/sellerMiddleware");
const sellerService = require("../../services/admin/sellerService");

seller.get("/seller", [sellerMiddleware.getSellersMiddleware], sellerService.getSellersService);
seller.get("/seller/:id", [sellerMiddleware.editSellersMiddleware], sellerService.editSellersService);

const authUserMiddleware = require("../../middlewares/authUserMiddleware");
seller.post("/seller", [authUserMiddleware.authenticateAdmin, sellerMiddleware.createSellerMiddleware], sellerService.createSellerService);
seller.post("/seller/:id", [authUserMiddleware.authenticateAdmin, sellerMiddleware.updateSellerMiddleware], sellerService.updateSellerService);
seller.delete("/seller/:id", [authUserMiddleware.authenticateAdmin, sellerMiddleware.deleteSellerMiddleware], sellerService.deleteSellerService);

module.exports = seller;