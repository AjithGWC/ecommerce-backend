const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        Name:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        categoryId:{
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        sellerId:{
            type: Schema.Types.ObjectId,
            ref: "Seller",
            required: true
        },
        currency:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        selledQuantity:{
            type: Number
        }
    },
    { timestamps: true }
);
const Product = mongoose.model("Product", ProductSchema);

module.exports = {
    Product
}