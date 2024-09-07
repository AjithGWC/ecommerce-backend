const mongoose = require('mongoose');
const cartModel = require("../../models/cartModel");
const productModel = require("../../models/productModel");

const getCart = async(data) => {
    try {
        const userId = data.userId;
        const cart = await cartModel.Cart.findOne({ userId });

        if (!cart || cart.products.length === 0) {
            throw new Error("No cart items found");
        }
        return cart;
    } catch (error) {
        throw new Error("Failed to fetch cart");
    }
};

const getCartProducts = async(data) => {
    try {
        const products = data.products; 
        
        const productDetails = [];

        for (const item of products) {
            
            const product = await productModel.Product.findById(item.productId);
            
            if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
            }
    
            productDetails.push({
            productId: item.productId,
            productName: product.Name, 
            price: product.price, 
            image: product.image,
            quantity: item.quantity  
            });
        }
    
        return productDetails;
    } catch (error) {
        throw new Error("Failed to fetch cart products: " + error.message);
    }
};
  

const createCart = async (data) => {
    const { userId, productId, quantity } = data;

    try {
        let cart = await cartModel.Cart.findOne({ userId });

        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId === productId);

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        } else {
            cart = new cartModel.Cart({
                userId,
                products: [{ productId, quantity }]
            });
        }

        const updatedCart = await cart.save();
        return updatedCart;
    } catch (error) {
        throw new Error("Failed to create or update cart: " + error.message);
    }
};

const deleteCart = async (data) => {
    const { userId, productId } = data;

    try {
        const cart = await cartModel.Cart.findOne({ userId });

        if (!cart) {
            throw new Error("Cart not found");
        }

        if (productId) {
            cart.products = cart.products.filter(p => p.productId !== productId);
        } else {
            await cartModel.Cart.deleteOne({ userId });
            return { message: "Cart deleted successfully" };
        }

        const updatedCart = await cart.save();
        return updatedCart;
    } catch (error) {
        throw new Error("Failed to delete product/cart: " + error.message);
    }
};

module.exports = {
    getCart, 
    getCartProducts,
    createCart,
    deleteCart
};
