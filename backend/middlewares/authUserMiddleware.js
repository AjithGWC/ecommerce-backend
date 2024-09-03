const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authenticateAdmin = (req, res, next) => {
    let token = req.cookies.token || req.headers['authorization'];
console.log("sdf");

    if (!token) {
        return res.status(401).json({ error: "No active token." });
    }

    if (token.startsWith('Bearer ')) {
        token = token.replace('Bearer ', '');
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admins only Allowed." });
        }

        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token." });
    }
};

module.exports = {authenticateAdmin};
