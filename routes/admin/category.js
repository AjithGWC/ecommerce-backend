const express = require("express");
const modelMiddleware = require("../../middlewares/modelMiddleware/modelMiddleware");

const category = express.Router();
category.use(modelMiddleware.modelMiddleware);

const categoryMiddleware = require("../../middlewares/categoryMiddleware");
const categoryService = require("../../services/admin/categoryService");

category.get("/category", [categoryMiddleware.getCategoriesMiddleware], categoryService.getCategoryService);
category.get("/category/:id", [categoryMiddleware.editCategoryMiddleware], categoryService.editCategoryService);

const authUserMiddleware = require("../../middlewares/authUserMiddleware");
category.post("/category", [authUserMiddleware.authenticateAdmin, categoryMiddleware.createcategoryMiddleware], categoryService.createCategoryService);
category.post("/category/:id", [authUserMiddleware.authenticateAdmin, categoryMiddleware.updateCategoryMiddleware], categoryService.updateCategoryService);
category.delete("/category/:id", [authUserMiddleware.authenticateAdmin, categoryMiddleware.deleteCategoryMiddleware], categoryService.deleteCategoryService);

module.exports = category;