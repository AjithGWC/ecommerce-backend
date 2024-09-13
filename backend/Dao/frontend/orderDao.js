const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");

const getOrdersDao = async() => {
    const orders = await orderModel.Order.find();

    if (!orders) {
        throw new Error("No cart items found");
    }
    return orders;
};

const getOrdersByOrderIdDao = async (data) => {
    const orders = await orderModel.Order.find(data);

    if (!orders || orders.length === 0) {
        throw new Error("No cart items found");
    }

    const allProducts = []; 

    for (const order of orders) {
        const productPromises = order.products.map(async (product) => {
            const productData = await productModel.Product.findById(product.productId);

            return { ...productData._doc, quantity: product.quantity }; 
        });

        const productsWithQuantity = await Promise.all(productPromises);
        allProducts.push(...productsWithQuantity);
    }
    console.log(allProducts);
    
    return allProducts ;
};


const getOrderByUserDao = async(data) => {
    const { userId } = data;
    
    const order = await orderModel.Order.find({ userId: userId });

    if (!order) {
        throw new Error("No cart items found");
    }
    return order;
};

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
    getOrdersDao,
    getOrdersByOrderIdDao,
    getOrderByUserDao,
    orderCreateDao
};