const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        productId:{
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity:{
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);
const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = {
    Wishlist
}