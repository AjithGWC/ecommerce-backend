const mongoose = require('mongoose');
const productModel = require("../models/productModel")

const getProducts = async(req, res, next) => {
    next();
};

const createProduct = async(req, res, next) => {
    const { Name, description, image, categoryId, sellerId, currency, price, quantity } = req.body;
    console.log(req.body);

    const requiredFields = [
        { field: Name, name: 'Name' },
        { field: image, name: 'image' },
        { field: categoryId, name: 'categoryId' },
        { field: sellerId, name: 'sellerId' },
        { field: currency, name: 'currency' },
        { field: price, name: 'price' },
        { field: quantity, name: 'quantity' }
    ];

    for (let { field, name } of requiredFields) {
        if (!field || field === "") {
            return res.status(400).json({ error: `${name} is required and cannot be empty.` });
        }
    }

    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
    const isUint8Array = (value) => value instanceof Uint8Array && value.length === 12;
    const isInteger = (value) => Number.isInteger(value);

    if (!(isValidObjectId(categoryId) || isUint8Array(categoryId) || isInteger(categoryId))) {
        return res.status(400).json({ error: "categoryId must be a 24-character hex string, a 12-byte Uint8Array, or an integer." });
    }

    if (!(isValidObjectId(sellerId) || isUint8Array(sellerId) || isInteger(sellerId))) {
        return res.status(400).json({ error: "sellerId must be a 24-character hex string, a 12-byte Uint8Array, or an integer." });
    }

    const existingProduct = await productModel.Product.findOne({ Name, categoryId, sellerId });

    if (existingProduct) {
        return res.status(400).json({ error: "A product with the same name, category already exists which is created by same seller." });
    }

    next();
};

const editProduct = async(req, res, next) => {
    const id = req.params;
    if(!id ){
        return res.status(400).json({ error: `id is required and cannot be empty.` });
    }
    next();
};

const updateProduct = async(req, res, next) => {
    const { Name, description, image, categoryId, sellerId, currency, price, quantity } = req.body;
    const { id } = req.params;

    const requiredFields = [
        { field: id, name: 'id' },
        { field: Name, name: 'Name' },
        { field: image, name: 'image' },
        { field: categoryId, name: 'categoryId' },
        { field: sellerId, name: 'sellerId' },
        { field: currency, name: 'currency' },
        { field: price, name: 'price' },
        { field: quantity, name: 'quantity' }
    ];

    for (let { field, name } of requiredFields) {
        if (!field || field.trim() === "") {
            return res.status(400).json({ error: `${name} is required and cannot be empty.` });
        }
    }

    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
    const isUint8Array = (value) => value instanceof Uint8Array && value.length === 12;
    const isInteger = (value) => Number.isInteger(value);

    if (!(isValidObjectId(categoryId) || isUint8Array(categoryId) || isInteger(categoryId))) {
        return res.status(400).json({ error: "categoryId must be a 24-character hex string, a 12-byte Uint8Array, or an integer." });
    }

    if (!(isValidObjectId(sellerId) || isUint8Array(sellerId) || isInteger(sellerId))) {
        return res.status(400).json({ error: "sellerId must be a 24-character hex string, a 12-byte Uint8Array, or an integer." });
    }

    const existingProduct = await Product.findOne({
        Name,
        categoryId,
        sellerId,
        _id: { $ne: id }
    });

    if (existingProduct) {
        return res.status(400).json({ error: "A product with the same name, category already exists which is created by same seller." });
    }

    next();
};

const deleteProduct = async(req, res, next) => {
    const { id } = req.params;
    console.log(id);
    
    if(!id || id.trim() === ""){
        return res.status(400).json({ error: `id is required and cannot be empty.` });
    }
    next();
};

module.exports = {
    getProducts,
    createProduct,
    editProduct,
    updateProduct,
    deleteProduct
}