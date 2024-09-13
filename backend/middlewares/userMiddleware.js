const validator = require('validator');

const getusers = async(req, res, next) => {
    next();
};

const newUsers = async(req, res, next) => {
    const { firstName, lastName, email, password, countryCode, phoneNumber, gender, address, district, state, country } = req.body;

    const allowedFields = [
        'firstName',
        'lastName',
        'email',
        'password',
        'countryCode',
        'phoneNumber',
        'gender',
        'address',
        'district',
        'state',
        'country'
    ];

    const requestBodyKeys = Object.keys(req.body);
    const unwantedFields = requestBodyKeys.filter(key => !allowedFields.includes(key));

    if (unwantedFields.length > 0) {
        return res.status(400).json({ error: `Unwanted fields: ${unwantedFields.join(', ')}` });
    }

    const requiredFields = [
        { field: firstName, name: 'firstName' },
        { field: lastName, name: 'lastName' },
        { field: email, name: 'email' },
        { field: password, name: 'password' },
        { field: countryCode, name: 'countryCode' },
        { field: phoneNumber, name: 'phoneNumber' },
        { field: gender, name: 'gender' },
        { field: address, name: 'address' },
        { field: district, name: 'district' },
        { field: state, name: 'state' },
        { field: country, name: 'country' }
    ];

    for (let { field, name } of requiredFields) {
        if (!field ) {
            return res.status(400).json({ error: `${name} is required and cannot be empty.` });
        }
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }

    next();
};

const editUser = async(req, res, next) => {
    const id = req.params;
    if(!id ){
        return res.status(400).json({ error: `id is required and cannot be empty.` });
    }
    next();
};

const updateUser = async(req, res, next) => {
    const { firstName, lastName, email, countryCode, phoneNumber, gender, address, district, state, country } = req.body;
    const { id } = req.params;

    const allowedFields = [
        'firstName',
        'lastName',
        'email',
        'countryCode',
        'phoneNumber',
        'gender',
        'address',
        'district',
        'state',
        'country'
    ];

    const requestBodyKeys = Object.keys(req.body);
    const unwantedFields = requestBodyKeys.filter(key => !allowedFields.includes(key));

    if (unwantedFields.length > 0) {
        return res.status(400).json({ error: `Unwanted fields: ${unwantedFields.join(', ')}` });
    }
    
    const requiredFields = [
        { field: id, name: 'id' },
        { field: firstName, name: 'firstName' },
        { field: lastName, name: 'lastName' },
        { field: email, name: 'email' },
        { field: countryCode, name: 'countryCode' },
        { field: phoneNumber, name: 'phoneNumber' },
        { field: gender, name: 'gender' },
        { field: address, name: 'address' },
        { field: district, name: 'district' },
        { field: state, name: 'state' },
        { field: country, name: 'country' }
    ];

    for (let { field, name } of requiredFields) {
        if (!field ) {
            return res.status(400).json({ error: `${name} is required and cannot be empty.` });
        }
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }

    next();
};

const deleteUser = async(req, res, next) => {
    const { id } = req.params;
    console.log(id);
    
    if(!id || id.trim() === ""){
        return res.status(400).json({ error: `id is required and cannot be empty.` });
    }
    next();
};

module.exports = {
    getusers,
    newUsers,
    editUser,
    updateUser,
    deleteUser
};
