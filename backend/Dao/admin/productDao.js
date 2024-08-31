const productModel = require("../../models/productModel");

const getProducts = async(data) => {
    try {
        return await productModel.Product.find();
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
};

const createProduct = async(data) => {
    const newUser = new productModel.Product({
        ...data,
    });
    const datas = await newUser.save();
    return{...datas._doc}
};

const editProduct = async(id) => {
    try {
        const product = await productModel.Product.findOne({ _id: id });
        console.log(product);
        
        return product;
    } catch (error) {
        console.log(error);
        
        throw new Error("Failed to fetch Product");
    }
};

const updateProduct = async(data) => {
    const id = data.id;
    const updatedUser = await productModel.Product.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true, runValidators: true }
    ).exec();

    if (!updatedUser) {
        throw new Error(`Product with id '${id}' not found`);
    }

    return updatedUser;
};

const deleteProduct = async(data) => {
    try{
        const { id } = data;
        console.log(id);
        
        const result  = await productModel.Product.findOneAndDelete({ _id: id });
        if (!result) {
            throw new Error("Product not found");
        }
        return result;
    } catch (error) {
        throw new Error("Failed to delete Product");
    }
};

module.exports = {
    getProducts,
    createProduct,
    editProduct,
    updateProduct,
    deleteProduct
}