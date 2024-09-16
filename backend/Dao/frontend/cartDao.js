const cartModel = require("../../models/cartModel");
const productModel = require("../../models/productModel");

const getCart = async (data) => {
    try {
        const userId = data.userId;
        const cart = await cartModel.Cart.findOne({ userId });

        if (!cart || cart.products.length === 0) {
            return { data: "No cart items found" };
        }
        return { message: "Cart retrieved successfully", data: cart };
    } catch (error) {
        return { message: "Failed to fetch cart", error: error.message };
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

const productQuantityUpdate = async (data) => {
    const { userId, productId, quantity } = data;

    try {
        console.log("1");
        
        const cart = await cartModel.Cart.findOne({ userId: userId });
        console.log("2");
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        console.log("3");
        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        console.log("4");
        if (productIndex > -1) {
          cart.products[productIndex].quantity = quantity;
          await cart.save();
          return cart;
        } else {
            throw new Error("Failed to create or update cart: " + error.message);
        }
      } catch (error) {
        throw new Error("Failed to create or update cart: " + error.message);
      }
};

const deleteProductCart = async (data) => {
    const { userId, productId } = data;

    try {
        const cart = await cartModel.Cart.findOne({ userId: userId });
        
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        
        cart.products = cart.products.filter(item => item.productId.toString() !== productId);
        await cart.save();
    
        return cart;
      } catch (error) {
        throw new Error("Failed to create or update cart: " + error.message);
      }
};

module.exports = {
    getCart, 
    getCartProducts,
    createCart,
    productQuantityUpdate,
    deleteProductCart
};
