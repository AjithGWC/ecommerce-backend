const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewRatingSchema = new Schema(
    {
        orderId:{
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },
        productId:{
            type: String,
            required: true
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        rating:{
            type: Number,
            required: true
        },
        comment:{
            type: String,
            required: true
        },
        attachment:{
            type: String,
            required: true
        }
    },
    { timestamps: true }
);
const reviewRating = mongoose.model("reviewRating", reviewRatingSchema);

module.exports = {
    reviewRating
}