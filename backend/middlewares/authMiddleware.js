const validator = require('validator');
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const loginValidation = async(req, res, next) => {
    const { email, password } = req.body;

    const allowedFields = [
        'email',
        'password'
    ];
    const requestBodyKeys = Object.keys(req.body);
    
    const unwantedFields = requestBodyKeys.filter(key => !allowedFields.includes(key));

    if (unwantedFields.length > 0) {
        return res.status(400).json({ error: `Unwanted fields: ${unwantedFields.join(', ')}` });
    }

    const requiredFields = [
        { field: email, name: 'email' },
        { field: password, name: 'password' }
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

const logoutValidation = (req, res, next) => {
    const token = req.cookies.token;
    console.log(req.cookies);

    if (!token) {
        return res.status(401).json({ message: 'No available token' });
    }

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log(decoded);
        next();
    });
};

module.exports = {
    loginValidation,
    logoutValidation
};