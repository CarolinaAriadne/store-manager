const productsService = require('../services/productsService');

const getAllControllerProducts = async (_req, res) => {
    const productsAll = await productsService.getAllServiceProducts();

    return res.status(200).json(productsAll);
};

const getByIdControllerProducts = () => {
    
};

module.exports = {
    getAllControllerProducts,
    getByIdControllerProducts,
};
