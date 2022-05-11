// const { registerSalesProductModel } = require('../models/salesModel');
const salesService = require('../services/salesService');

const getAllControllerSales = async (_req, res, next) => {
    try {
        const salesAll = await salesService.getAllServiceSales();
        return res.status(200).json(salesAll);
    } catch (error) {
        next(error);
    }
};

const getByIdControllerSales = async (req, res, next) => {
    try {
        const { id } = req.params;
        const salesId = await salesService.getByIdServiceSales(id);
        return res.status(200).json(salesId);
    } catch (error) {
        next(error);
    }
};

const registerSales = async (req, res, next) => {
    try {
        const sale = req.body;
        console.log(sale, 'sale controller');
        const response = await salesService.registerSalesService(sale);
        console.log('response controller', response);
        return res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

const updateSale = async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await salesService.updateSaleService(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllControllerSales,
    getByIdControllerSales,
    registerSales, 
    updateSale,
};
