const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountryCodeSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        dialCode:{
            type: String,
            required: true
        },
        currencyName:{
            type: String,
            required: true
        },
        currencyCode:{
            type: String,
            required: true
        },
        currencySymbol:{
            type: String,
            required: true
        }
    },
    { timestamps: true }
);
const CountryCode = mongoose.model("CountryCode", CountryCodeSchema);

module.exports = {
    CountryCode
}