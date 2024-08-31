const roleModel = require("../../models/rolesModel");

const getRoles = async() => {
    try {
        return await roleModel.Role.find();
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
};

const createRoles = async(data) => {
    console.log(data);
    
    const newRole = new roleModel.Role({
        ...data,
    });
    const datas = await newRole.save();
    return{...datas._doc}
};

module.exports = {
    getRoles,
    createRoles
}