const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [
            {
                productId:{
                    type: String,
                    required: true
                },
                quantity:{
                    type: Number,
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
);
const Cart = mongoose.model("Cart", CartSchema);

module.exports = {
    Cart
}