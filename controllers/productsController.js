const productsService = require('../services/productsService');

const getAllControllerProducts = async (_req, res, next) => {
  try {
    const productsAll = await productsService.getAllServiceProducts();

    return res.status(200).json(productsAll);
  } catch (error) {
    next(error);
  }
};

const getByIdControllerProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = await productsService.getByIdServiceProduct(id);
    return res.status(200).json(productId);
  } catch (error) {
    next(error);
  }
};

const createName = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await productsService.createNameService(name, quantity);

    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const productUpdated = await productsService.updateProductService(id, name, quantity);
 
    return res.status(200).json(productUpdated);
  } catch (error) {
    next(error);
  }
};

const deletProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

   await productsService.deleteProductService(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllControllerProducts,
  getByIdControllerProducts,
  createName,
  updateProduct,
  deletProduct,

};
