const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderesProductSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        orderId:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        productPrice:{
            type: Number,
            required: true
        },
        totalProductPrice:{
            type: Number,
            required: true
        },
        productIdcategoryId:{
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);
const OrderesProduct = mongoose.model("OrderesProduct", OrderesProductSchema);

module.exports = {
    OrderesProduct
}