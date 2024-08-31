const countryDao = require('../../Dao/admin/countryCodeDao');

const getCountriesService = async(req, res, next) => {
    try{
        const countries = await countryDao.getCountriesDao();
        return res.status(200).json(countries);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const createCountriesService = async(req, res, next) => {
    try{
        const { name, dialCode, currencyName, currencyCode, currencySymbol } = req.body;

        const data = await countryDao.createCountry({ name, dialCode, currencyName, currencyCode, currencySymbol });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

module.exports = {
    getCountriesService,
    createCountriesService
}