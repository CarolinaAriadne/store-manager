const productsModel = require('../models/productsModel');

const erroHandler = (status, message) => ({
    status,
    message,
});

const getAllServiceProducts = async () => {
    const productsAll = await productsModel.getAllProductsModel();
    // console.log(productsAll, 'productsAll services');
   
    if (productsAll.length === 0) {
        throw erroHandler(404, 'Product not found');
    }
    return productsAll;
};

const getByIdServiceProduct = async (id) => {
    const productById = await productsModel.getByIdProductsModel(id);
   
    if (!productById) {
        throw erroHandler(404, 'Product not found');
    }
    return productById;
};

const createNameService = async (name, quantity) => {
    const verifyName = await productsModel.getProductName(name); 
  
    if (verifyName.length > 0) {
        throw erroHandler(409, 'Product already exists');
    }

    const productInsertedId = await productsModel.createNameModel(name, quantity);

    const product = await productsModel.getByIdProductsModel(productInsertedId);

    return product;
};

const updateProductService = async (id, name, quantity) => {
    const verifyId = await productsModel.getProductIdUp(id);
   
    if (verifyId.length === 0) {
        throw erroHandler(404, 'Product not found');
    }

    const updatedProductId = await productsModel.updateProductModel(id, name, quantity);

    const product = await productsModel.getByIdProductsModel(updatedProductId);

    return product;
};

const deleteProductService = async (id) => {
    const verifyId = await productsModel.getProductIdUp(id);

    if (verifyId.length === 0) {
        throw erroHandler(404, 'Product not found'); 
    }

     await productsModel.deleteProductModel(id);
};

module.exports = {
    getAllServiceProducts,
    getByIdServiceProduct,
    createNameService,
    updateProductService,
    deleteProductService,
};
