const roleDao = require("../../Dao/admin/roleDao");

const getRoles = async(req, res, next) => {
    try{
        const users = await roleDao.getRoles();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        next(error);
    }
}

const createRoles = async(req, res, next) => {
    try{
        const { Name } = req.body;
        const data = await roleDao.createRoles({ Name });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
}

module.exports = {
    getRoles,
    createRoles,
}