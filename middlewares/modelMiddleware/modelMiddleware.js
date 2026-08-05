const modelMiddleware = (err, req, res, next) => {
    if (err.name === "MongoServerError" && err.code === 11000) {
        const duplicateField = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            error: `${duplicateField} must be unique. The value '${err.keyValue[duplicateField]}' is already taken.`
        });
    }
    next(err);
};

module.exports = {
    modelMiddleware
};