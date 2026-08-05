const validator = require('validator');

const getRoles = async(req, res, next) => {
    next();
};

const createRoles = async(req, res, next) => {
    const { Name } = req.body;

    const requiredFields = [
        { field: Name, name: 'Name' }
    ];

    for (let { field, name } of requiredFields) {
        if (!field ) {
            return res.status(400).json({ error: `${name} is required and cannot be empty.` });
        }
    }
    
    next();
}; 

module.exports = {
    getRoles,
    createRoles,
}