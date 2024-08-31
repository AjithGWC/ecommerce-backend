const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        RoleId:{
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true
        }
    },
    { timestamps: true }
);
const UserRole = mongoose.model("UserRole", UserRoleSchema);

module.exports = {
    UserRole
}