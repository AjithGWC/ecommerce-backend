const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        countryCode: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        role: {
            type: String,
            required: true,
            default: 'user'
        },
        address: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 400
        },
        district: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

UserSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoServerError" && error.code === 11000) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        error.message = `${duplicateField} must be unique. The value '${error.keyValue[duplicateField]}' is already taken.`;
        next(error);
    } else {
        next(error);
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
};
