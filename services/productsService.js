const productsModel = require('../models/productsModel');

const erroHandler = (status, message) => ({
    status,
    message,
});

const getAllServiceProducts = async () => {
    const productsAll = await productsModel.getAllProductsModel();
    // console.log(productsAll);
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

const createNameService = async (name, quantity) => {
    const verifyName = await productsModel.getProductName(name); 
    // console.log('aqui é na service', verifyName); 
    if (verifyName.length > 0) {
        throw erroHandler(409, 'Product already exists');
    }

    const productInsertedId = await productsModel.createNameModel(name, quantity);

    const product = await productsModel.getByIdProductsModel(productInsertedId);

    return product;
};

const updateProductService = async (id, name, quantity) => {
    // console.log('eu sou o id na service', id);
    const verifyId = await productsModel.getProductIdUp(id);
    // console.log('id na service, retorno model', verifyId);

    if (verifyId.length === 0) {
        // console.log('passei aqui');
        throw erroHandler(404, 'Product not found');
    }

    const updatedProductId = await productsModel.updateProductModel(id, name, quantity);
    // console.log('retorno updateProductModel', updatedProductId);

    const product = await productsModel.getByIdProductsModel(updatedProductId);

    // console.log('dados do produto atualizado', product);

    return product;
};

const deleteProductService = async (id) => {
    const verifyId = await productsModel.getProductIdUp(id);
    console.log('verify delete service', verifyId);

    if (verifyId.length === 0) {
        console.log('passei aqui', verifyId);
        throw erroHandler(404, 'Product not found'); 
    }

     await productsModel.deleteProductModel(id);
    // console.log(deleteProductId, 'id');

    // const product = await productsModel.getByIdProductsModel(id);
    // console.log(product);
};

module.exports = {
    getAllServiceProducts,
    getByIdServiceProduct,
    createNameService,
    updateProductService,
    deleteProductService,
};
