const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");
const authUserMiddleware = require("../../middlewares/authUserMiddleware");

const category = express.Router();
category.use(authUserMiddleware);
category.use(modelMiddleware.modelMiddleware);

const categoryMiddleware = require("../../middlewares/categoryMiddleware");
const categoryService = require("../../services/admin/categoryService");

category.get("/category", [categoryMiddleware.getCategoriesMiddleware], categoryService.getCategoryService);
category.post("/category", [categoryMiddleware.createcategoryMiddleware], categoryService.createCategoryService);
category.get("/category/:id", [categoryMiddleware.editCategoryMiddleware], categoryService.editCategoryService);
category.post("/category/:id", [categoryMiddleware.updateCategoryMiddleware], categoryService.updateCategoryService);
category.delete("/category/:id", [categoryMiddleware.deleteCategoryMiddleware], categoryService.deleteCategoryService);

module.exports = category;