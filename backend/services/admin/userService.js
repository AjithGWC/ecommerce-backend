const userDao = require("../../Dao/admin/userDao");
const bcrypt = require('bcrypt');

const getUsers = async(req, res, next) => {
    try{
        const users = await userDao.getUsers();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const createUserService = async(req, res, next) => {
    try{
        const { firstName, lastName, email, password, countryCode, phoneNumber, gender, image, address, district, state, country } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await userDao.createUsers({ firstName, lastName, email, password: hashedPassword, countryCode, phoneNumber, gender, image, address, district, state, country });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const editUser = async(req, res, next) => {
    try{
        const { id } = req.params;
        const users = await userDao.editUser( id );
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const updateUser = async(req, res, next) => {
    try{
        const { id } = req.params;
        const { firstName, lastName, email, password, countryCode, phoneNumber, gender, image, address, district, state, country } = req.body;

        let updateFields = { id, firstName, lastName, email, countryCode, phoneNumber, gender, image, address, district, state, country };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }
        const data = await userDao.updateUser(updateFields);
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const deleteUser = async(req, res, next) => {
    try{
        const { id } = req.params;
        const data = await userDao.deleteUser({ id })
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

module.exports = {
    getUsers,
    createUserService,
    editUser,
    updateUser,
    deleteUser
}