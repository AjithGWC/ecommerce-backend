const sellerModel = require("../../models/sellerModel");
const userModel = require("../../models/userModel");

const getSellersDao = async() => {
    try {
        return await sellerModel.Seller.find();
    } catch (error) {
        throw new Error("Failed to fetch sellers");
    }
};

const createSellerDao = async(data) => {
    const newUser = new sellerModel.Seller({
        ...data,
    });
    const datas = await newUser.save();
    return{...datas._doc}
};

const editSeller = async(id) => {
    try {
        const user = await userModel.User.findOne({ _id: id });
        return user;
    } catch (error) {
        console.log(error);
        
        throw new Error("Failed to fetch Seller");
    }
};

const updateSeller = async(data) => {
    const id = data.id;
    const updatedUser = await userModel.User.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true, runValidators: true }
    ).exec();

    if (!updatedUser) {
        throw new Error(`Seller with id '${id}' not found`);
    }

    return updatedUser;
};

const deleteSeller = async(id) => {
    try{
        const result  = await userModel.User.findOneAndDelete({ _id: id });
        if (!result) {
            throw new Error("Seller not found");
        }
        return result;
    } catch (error) {
        throw new Error("Failed to delete Seller");
    }
};

module.exports = {
    getSellersDao,
    createSellerDao,
    editSeller,
    updateSeller,
    deleteSeller
};