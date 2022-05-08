const productsModel = require('../models/productsModel');

const erroHandler = (status, message) => ({
    status,
    message,
});

const getAllServiceProducts = async () => {
    const productsAll = await productsModel.getAllProductsModel();
    // console.log(productsAll);
    if (productsAll.length === 0) {
        throw erroHandler(404, 'Products not returned ');
    }
    return productsAll;
};

const getByIdServiceProduct = async (id) => {
    const productById = await productsModel.getByIdProductsModel(id);
    if (productById.length === 0) {
        throw erroHandler(404, 'Product not returned ');
    }
    return productById;
};

module.exports = {
    getAllServiceProducts,
    getByIdServiceProduct,
};