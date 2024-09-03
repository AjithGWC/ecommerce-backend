const productModel = require("../models/cartModel");

const getCart = async(req, res, next) => {
    const { id } = req.params;
    console.log(id);
    
    if(!id || id.trim() === ""){
        return res.status(400).json({ error: `User id is required and cannot be empty.` });
    }
    next();
};

module.exports = {
    getCart
}