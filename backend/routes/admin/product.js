const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");
const authUserMiddleware = require("../../middlewares/authUserMiddleware");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

const product = express.Router();

product.use(modelMiddleware.modelMiddleware);

const productMiddleware = require("../../middlewares/productMiddleware");
const productService = require("../../services/admin/productService");

product.get("/product", [productMiddleware.getProducts], productService.getProductsService, upload.single('image') );
product.post("/product", [productMiddleware.createProduct], productService.createProductService);
product.get("/product/:id", [productMiddleware.editProduct], productService.editUserService);
product.post("/product/:id", [productMiddleware.updateProduct], productService.updateProductService);
product.delete("/product/:id", [productMiddleware.deleteProduct], productService.deleteProductService)

module.exports = product;