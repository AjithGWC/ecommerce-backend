const categoryDao = require("../../Dao/admin/categoryDao");

const getCategoryService = async(req, res, next) => {
    try{
        const users = await categoryDao.getCategoriesDao();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const createCategoryService = async(req, res, next) => {
    try{
        const { Name, image, description } = req.body;
        
        const data = await categoryDao.createCategoryDao({ Name, image, description });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const editCategoryService = async(req, res, next) => {
    try{
        const { id } = req.params;
        const users = await categoryDao.editCategoryDao( id );
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const updateCategoryService = async(req, res, next) => {
    try{
        const { Name, image, description } = req.body;
        const { id } = req.params;
        
        const data = await categoryDao.updateCategoryDao({ id, Name, image, description });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const deleteCategoryService = async(req, res, next) => {
    try{
        const { id } = req.params;
        const users = await categoryDao.deleteCategoryDao( id );
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        next(error);
    }
};

module.exports = {
    getCategoryService,
    createCategoryService,
    editCategoryService,
    updateCategoryService,
    deleteCategoryService
}