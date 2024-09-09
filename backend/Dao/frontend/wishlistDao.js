
const wishlistModel = require("../../models/wishlistModel");

const getWishlist = async(data) => {
    const { userId } = data;
    try {
        
        let wishlist = await wishlistModel.Wishlist.findOne({ userId });
    
        if (!wishlist || wishlist.products.length === 0) {
            throw new Error("No wishlist items found");
        }
        return wishlist;
      } catch (err) {
        throw new Error("Failed to fetch wishlist");
      }
};

const addWishlist = async (data) => {
    const { userId, productId } = data;
    try {
        let wishlist = await wishlistModel.Wishlist.findOne({ userId: userId });
        if (!wishlist) {
            wishlist = new wishlistModel.Wishlist({  
                userId,
                products: [{ productId: productId }]
            });
        } else {
            
            const productIndex = wishlist.products.findIndex(p => p.productId.equals(productId));
            
            if (productIndex === -1) {
                wishlist.products.push({productId});
            }else{
                wishlist.products.splice(productIndex, 1);
            }
        }

        const updatedWishlist = await wishlist.save();
        return updatedWishlist;
    } catch (err) {
        throw new Error("Failed to fetch wishlist");
    }
};


const removeWishlist = async(data) => {
    const { userId, productId } = data;
    try {
        let wishlist = await wishlistModel.Wishlist.findOne({ user: userId });
        if (wishlist) {
          wishlist.products = wishlist.products.filter(id => id !== productId);
        }
    
        return wishlist;
      } catch (err) {
        throw new Error("Failed to fetch wishlist");
      }
};

module.exports = {
    getWishlist,
    addWishlist,
    removeWishlist
}