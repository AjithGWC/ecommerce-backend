const productDao = require("../../Dao/admin/productDao");
const mongoose = require('mongoose');

const getProductsService = async(req, res, next) => {
    try{
        const users = await productDao.getProducts();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const createProductService = async(req, res, next) => {
    try{
        const { Name, image, categoryId, sellerId, currency, price, quantity, selledQuantity } = req.body;
console.log(req.body);

        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
        const sellerObjectId = new mongoose.Types.ObjectId(sellerId);

        const { description } = req.body.description || "";

        const data = await productDao.createProduct({ Name, description, image, categoryId: categoryObjectId, sellerId: sellerObjectId, currency, price, quantity, selledQuantity });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const editUserService = async(req, res, next) => {
    try{
        const { id } = req.params;
        const data = await productDao.editProduct( id );
        return res.status(200).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const updateProductService = async(req, res, next) => {
    try{
        const { Name, image, categoryId, sellerId, currency, price, quantity, selledQuantity } = req.body;
        const { id } = req.params;

        const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
        const sellerObjectId = new mongoose.Types.ObjectId(sellerId);

        const description = req.body.description || "";

        const data = await productDao.updateProduct({ id, Name, description, image, categoryId: categoryObjectId, sellerId: sellerObjectId, currency, price, quantity, selledQuantity });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const deleteProductService = async(req, res, next) => {
    try{
        const { id } = req.params;
        const data = await productDao.deleteProduct({ id })
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

module.exports = {
    getProductsService,
    createProductService,
    editUserService,
    updateProductService,
    deleteProductService
}