const productModel = require("../models/cartModel");
const mongoose = require('mongoose');


const getCart = async(req, res, next) => {
    const { userId } = req.params;
    
    if(!userId || userId.trim() === "" || !mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({ error: `User id is required and cannot be empty.` });
    }
    next();
};

const createCart = async(req, res, next) => {
    const { productId, quantity } = req.body;
    const { userId } = req.params;
    
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid userId.' });
    }

    if (typeof productId !== 'string' || productId.trim() === '') {
        return res.status(400).json({ error: 'productId should be a non-empty string.' });
      }
    
      if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'quantity must be a positive number.' });
      }
    
    next();
};

// const updateCart = async(req, res, next) => {
//     const { productId, quantity } = req.body;
//     const { userId } = req.params;

//     if (typeof productId !== 'string' || productId.trim() === '') {
//         return res.status(400).json({ error: 'productId should be a non-empty string.' });
//       }
    
//       if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
//         return res.status(400).json({ error: 'quantity must be a positive number.' });
//       }
    
//     next();
// };

const deleteCart = async(req, res, next) => {
    const { userId } = req.params;
    
    if(!userId || userId.trim() === ""){
        return res.status(400).json({ error: `id is required and cannot be empty.` });
    }
    next();
};

module.exports = {
    getCart,
    createCart,
    deleteCart
}