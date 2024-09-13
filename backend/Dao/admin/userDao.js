const userModel = require("../../models/userModel");

const getUsers = async() => {
    try {
        return await userModel.User.find();
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
};

const createUsers = async(data) => {
    const newUser = new userModel.User({
        ...data,
    });
    const datas = await newUser.save();
    return{...datas._doc}
};

const editUser = async(id) => {
    try {
        const user = await userModel.User.findOne({ _id: id });
        return user;
    } catch (error) {
        console.log(error);
        
        throw new Error("Failed to fetch users");
    }
};

const updateUser = async(data) => {
    const id = data.id;
    const updatedUser = await userModel.User.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true, runValidators: true }
    ).exec();

    if (!updatedUser) {
        throw new Error(`User with id '${id}' not found`);
    }

    return updatedUser;
};

const deleteUser = async(id) => {
    try{
        const result  = await userModel.User.findOneAndDelete({ _id: id });
        if (!result) {
            throw new Error("User not found");
        }
        return result;
    } catch (error) {
        throw new Error("Failed to delete user");
    }
};

module.exports = {
    getUsers,
    createUsers,
    editUser,
    updateUser,
    deleteUser
}