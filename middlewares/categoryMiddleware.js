const getCategoriesMiddleware = async(req, res, next) => {
    next();
};

const createcategoryMiddleware = async(req, res, next) => {
    const { Name, image, description } = req.body;

    const requiredFields = [
        { field: Name, name: 'Name' },
        { field: image, name: 'image' },
        { field: description, name: 'description' }
    ];

    for (let { field, name } of requiredFields) {
        if (!field ) {
            return res.status(400).json({ error: `${name} is required and cannot be empty.` });
        }
    }
    next();
};

const editCategoryMiddleware = async(req, res, next) => {
    const id = req.params;
    if(!id ){
        return res.status(400).json({ error: `id is required and cannot be empty.` });
    }
    next();
};

const updateCategoryMiddleware = async(req, res, next) => {
    const { Name, image, description } = req.body;
    const { id } = req.params;

    const requiredFields = [
        { field: id, name: 'id' },
        { field: Name, name: 'Name' },
        { field: image, name: 'image' },
        { field: description, name: 'description' }
    ];

    for (let { field, name } of requiredFields) {
        if (!field ) {
            return res.status(400).json({ error: `${name} is required and cannot be empty.` });
        }
    }
    next();
};

const deleteCategoryMiddleware = async(req, res, next) => {
    const { id } = req.params;
    console.log(id);
    
    if(!id || id.trim() === ""){
        return res.status(400).json({ error: `id is required and cannot be empty.` });
    }
    next();
};

module.exports = {
    getCategoriesMiddleware,
    createcategoryMiddleware,
    editCategoryMiddleware,
    updateCategoryMiddleware,
    deleteCategoryMiddleware
}