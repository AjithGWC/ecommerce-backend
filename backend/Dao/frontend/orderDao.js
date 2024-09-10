const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");

const orderCreateDao = async(data) => {
    const { userId, products, shipping, total } = data;
    try {
        const productDetails = await Promise.all(
            products.map(async (product) => {
                const productData = await productModel.Product.findById(product.productId).select('sellerId');
                if (!productData) {
                    throw new Error(`Product with ID ${product.productId} not found`);
                }
                return {
                    ...product,
                    sellerId: productData.sellerId,
                };
            })
        );

        const sellerId = productDetails[0].sellerId;

        const newOrder = new orderModel.Order({
            userId: userId,
            sellerId: sellerId,
            products: productDetails.map(({ productId, quantity }) => ({
                productId,
                quantity,
            })),
            shippingAmount: shipping,
            orderTotalAmount: total,
            paymentStatus: "processing",
            orderStatus: "pending",
        });

        const savedOrder = await newOrder.save();

        return savedOrder;
    } catch (error) {
        throw new Error("Failed to Place Order: " + error.message);
    }
};

module.exports = {
    orderCreateDao
};