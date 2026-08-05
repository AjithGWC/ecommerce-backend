const categoryModel = require("../../models/categoryModel");

const getCategoriesDao = async(data) => {
    try {
        return await categoryModel.Category.find();
    } catch (error) {
        throw new Error("Failed to fetch categories");
    }
};

const createCategoryDao = async(data) => {
    const newUser = new categoryModel.Category({
        ...data,
    });
    const datas = await newUser.save();
    return{...datas._doc}
};

const editCategoryDao = async(data) => {
    const id = data;
    try {
        const user = await categoryModel.Category.findOne({ _id: id });
        return user;
    } catch (error) {
        console.log(error);
        
        throw new Error("Failed to fetch Category");
    }
};

const updateCategoryDao = async(data) => {
    const id = data.id;
    const updatedCategory = await categoryModel.Category.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true, runValidators: true }
    ).exec();

    if (!updatedCategory) {
        throw new Error(`Category with id '${id}' not found`);
    }

    return updatedCategory;
};

const deleteCategoryDao = async(id) => {
    try{
        const result  = await categoryModel.Category.findOneAndDelete({ _id: id });
        if (!result) {
            throw new Error("Category not found");
        }
        return result;
    } catch (error) {
        throw new Error("Failed to delete Category");
    }
};

module.exports = {
    getCategoriesDao,
    createCategoryDao,
    editCategoryDao,
    updateCategoryDao,
    deleteCategoryDao
}