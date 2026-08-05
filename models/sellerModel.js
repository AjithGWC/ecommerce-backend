const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);
const Seller = mongoose.model("Seller", SellerSchema);

module.exports = {
    Seller
}