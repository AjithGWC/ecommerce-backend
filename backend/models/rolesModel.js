const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const RoleSchema = new Schema(
    {
        Name: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

RoleSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoServerError" && error.code === 11000) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        error.message = `${duplicateField} must be unique. The value '${error.keyValue[duplicateField]}' is already taken.`;
        next(error);
    } else {
        next(error);
    }
});

// RoleSchema.pre("save", async function (next) {
//     if (this.isNew || this.isModified("Name")) {
//         let slug = slugify(this.Name, { lower: true, strict: true });
//         let uniqueSlug = slug;
//         let counter = 1;

//         while (await mongoose.models.Role.exists({ slug: uniqueSlug })) {
//             uniqueSlug = `${slug}-${counter}`;
//             counter++;
//         }

//         this.slug = uniqueSlug;
//     }
//     next();
// });

const Role = mongoose.model("Role", RoleSchema);

module.exports = {
    Role
};
