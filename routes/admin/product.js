const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");

const product = express.Router();

product.use(modelMiddleware.modelMiddleware);

const productMiddleware = require("../../middlewares/productMiddleware");
const productService = require("../../services/admin/productService");

product.get("/product", [productMiddleware.getProducts], productService.getProductsService );
product.get("/product/:id", [productMiddleware.editProduct], productService.editUserService);

const authUserMiddleware = require("../../middlewares/authUserMiddleware");
product.post("/product", [authUserMiddleware.authenticateAdmin, productMiddleware.createProduct], productService.createProductService);
product.post("/product/:id", [authUserMiddleware.authenticateAdmin, productMiddleware.updateProduct], productService.updateProductService);
product.delete("/product/:id", [authUserMiddleware.authenticateAdmin, productMiddleware.deleteProduct], productService.deleteProductService)

module.exports = product;