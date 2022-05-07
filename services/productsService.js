const productsModel = require('../models/productsModel');

const getAllServiceProducts = async () => {
    const productsAll = await productsModel.getAllProductsModel();

    return productsAll;
};

module.exports = {
    getAllServiceProducts,
};