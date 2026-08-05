const countryModel = require("../../models/countryCodeModel");

const getCountriesDao = async(data) => {
    try {
        return await countryModel.CountryCode.find();
    } catch (error) {
        throw new Error("Failed to fetch Countries");
    }
};

const createCountry = async(data) => {
    const newUser = new countryModel.CountryCode({
        ...data,
    });
    const datas = await newUser.save();
    return{...datas._doc}
};

module.exports = {
    getCountriesDao,
    createCountry
}