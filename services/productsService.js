const productsModel = require('../models/productsModel');

const erroHandler = (status, message) => ({
    status,
    message,
});

const getAllServiceProducts = async () => {
    const productsAll = await productsModel.getAllProductsModel();
    console.log(productsAll);
    if (productsAll.length === 0) {
        throw erroHandler(404, 'Product not found');
    }
    return productsAll;
};

const getByIdServiceProduct = async (id) => {
    const productById = await productsModel.getByIdProductsModel(id);
    // console.log(productById);
    if (!productById) {
        throw erroHandler(404, 'Product not found');
    }
    return productById;
};

const createNameService = async (name, quantify) => {
    const verifyName = await productsModel.getProductName(name); 
    // console.log('aqui é na service', verifyName); 
    if (!verifyName) {
        throw erroHandler(409, 'Product already exists');
    }

    const registerNameQuantify = await productsModel.createNameModel(name, quantify);
    return registerNameQuantify;
};

module.exports = {
    getAllServiceProducts,
    getByIdServiceProduct,
    createNameService,
};
