const productsService = require('../services/productsService');

const getAllControllerProducts = async (_req, res, next) => {
  try {
    const productsAll = await productsService.getAllServiceProducts();

    return res.status(200).json(productsAll);
  } catch (error) {
    next(error);
  }
};

const getByIdControllerProducts = async (req, res) => {
  const { id } = req.params;
  const productId = await productsService.getByIdServiceProduct(id);
  return res.status(200).json(productId);
};

module.exports = {
  getAllControllerProducts,
  getByIdControllerProducts,
};
