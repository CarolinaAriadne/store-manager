const salesService = require('../services/salesService');

const getAllControllerSales = async (_req, res, next) => {
    try {
        const salesAll = await salesService.getAllServiceSales();
        return res.status(200).json(salesAll);
    } catch (error) {
        next(error);
    }
};

const getByIdControllerSales = async (req, res) => {
        const { id } = req.params;
        const salesId = await salesService.getByIdServiceSales(id);
        return res.status(200).json(salesId);
};

module.exports = {
    getAllControllerSales,
    getByIdControllerSales,
};
