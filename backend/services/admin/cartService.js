const getCartService = async(req, res, next) => {
    try{
        const users = await cartDao.getCart();
        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        next(error);
    }
};

const createCart = async(req, res, next) => {
    try{
        const { userId, productId, quantity } = req.body;
        console.log(req.body);

        const data = await cartDao.createCart({ userId, productId, quantity });
        return res.status(201).json(data);
    }catch(error){
        console.log(error);
        next(error);
    }
};

module.exports = {
    getCartService,
    createCart
}