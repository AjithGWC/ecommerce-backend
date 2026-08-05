const sellerDao = require("../../Dao/admin/sellerDao");
const userDao = require("../../Dao/admin/userDao");
const bcrypt = require('bcrypt');

const getSellersService = async(req, res, next) => {
    try{
        const users = await sellerDao.getSellersDao();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const createSellerService = async(req, res, next) => {
    try{
        const { firstName, lastName, email, password, countryCode, phoneNumber, gender, image, address, district, state, country } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await userDao.createUsers({ firstName, lastName, email, password: hashedPassword, countryCode, phoneNumber, gender, image, address, district, state, country, role: "seller" });
        const seller = await sellerDao.createSellerDao({ userId: data._id });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const editSellersService = async(req, res, next) => {
    try{
        const { id } = req.params;
        const users = await sellerDao.editSeller( id );
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const updateSellerService = async(req, res, next) => {
    try{
        const { id } = req.params;

        const { firstName, lastName, email, password, countryCode, phoneNumber, gender, image, address, district, state, country } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await sellerDao.updateSeller({ id, firstName, lastName, email, password: hashedPassword, countryCode, phoneNumber, gender, image, address, district, state, country });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const deleteSellerService = async(req, res, next) => {
    try{
        const { id } = req.params;
        const data = await sellerDao.deleteSeller({ id });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

module.exports = {
    getSellersService,
    createSellerService,
    editSellersService,
    updateSellerService,
    deleteSellerService
};