const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const userLogin = async(data) => {
    const { email, password } = data;
    const user = await userModel.User.findOne({ email });
    
    if (!user) {
        return ({ message: "User not found" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return ({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        jwtSecretKey,
        {
        expiresIn: "1h",
        }
    );
    return({ success: true, token });
};

module.exports = {
    userLogin
}