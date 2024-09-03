const authDao = require("../../Dao/frontend/authDao")

const userLogin = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const data = await authDao.userLogin({ email, password });
        console.log(data);
        
        if (data.success) {
            
            res.cookie('token', data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'development',
                sameSite: 'Strict',
                path: '/'
            });
            
            res.cookie('userId', data.userId, { 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'development',
                sameSite: 'Strict',
                path: '/'
            });

            res.cookie('role', data.role, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'development',
                sameSite: 'Strict',
                path: '/'
            });
            // console.log("token:", data.token);
            return res.status(200).json({ data: data, message: 'Logged in successfully' });
        } else {
            return res.status(400).json({ message: data.message });
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid Error" });
    }
};

const userLogout = async(req, res, next) => {
    try {
        res.cookie('token', '', { expires: new Date(0), httpOnly: true });
        res.cookie('role', '', { expires: new Date(0), httpOnly: true });
        res.cookie('user', '', { expires: new Date(0), httpOnly: true });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid Error" });
    }
};

module.exports = {
    userLogin,
    userLogout
}