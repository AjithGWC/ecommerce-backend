const cartModel = require("../../models/cartModel");

const getCart = async(id) => {
    try {
        return await cartModel.Cart.find(id);
    } catch (error) {
        throw new Error("Failed to fetch cart");
    }
};

const createCart = async(data) => {
    const newUser = new cartModel.Cart({
        ...data,
    });
    const datas = await newUser.save(); 
    return{...datas._doc}
};

module.exports = {
    getCart, 
    createCart
}