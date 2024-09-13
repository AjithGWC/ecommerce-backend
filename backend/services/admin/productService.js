const productDao = require("../../Dao/admin/productDao");

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
        const { Name, description, image, categoryId, sellerId, currency, price, quantity, selledQuantity } = req.body;

        const data = await productDao.createProduct({ Name, description, image, categoryId, sellerId, currency, price, quantity, selledQuantity });
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
        console.log(data);
        
        return res.status(200).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const updateProductService = async(req, res, next) => {
    try{
        const { Name, description, image, categoryId, sellerId, currency, price, quantity, selledQuantity } = req.body;
        const { id } = req.params;

        const data = await productDao.updateProduct({ id, Name, description, image, categoryId, sellerId, currency, price, quantity, selledQuantity });
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