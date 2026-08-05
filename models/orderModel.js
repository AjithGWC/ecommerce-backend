const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        sellerId:{
            type: Schema.Types.ObjectId,
            ref: "Seller",
            required: true
        },
        products:[
            {
                productId:{
                    type: String,
                    ref: "Product",
                    required: true
                },
                quantity:{
                    type: Number,
                    required: true
                }
            }
        ],
        shippingAmount:{
            type: Number,
            required: true
        },
        orderTotalAmount:{
            type: Number,
            required: true
        },
        paymentStatus:{
            type: String,
            required: true,
            enum: [ 'processing', 'completed', 'cod' ]
        },
        orderStatus:{
            type: String,
            required: true,
            enum: [ 'pending', 'processing', 'shipped', 'delivered', 'cancelled' ]
        }
    },
    { timestamps: true }
);
const Order = mongoose.model("Order", OrderSchema);

module.exports = {
    Order
}