const salesModel = require('../models/salesModel');

const erroHandler = (status, message) => ({
    status,
    message,
});

const getAllServiceSales = async () => {
    const salesAll = await salesModel.getAllSalesModel();
    if (salesAll.length === 0) {
        throw erroHandler(404, 'Sale not found');
    }
    return salesAll;
};

const getByIdServiceSales = async (id) => {
    const salesById = await salesModel.getByIdSalesModel(id);
    if (salesById.length === 0) {
        throw erroHandler(404, 'Sale not found');
    }
    return salesById;
};

module.exports = {
    getAllServiceSales,
    getByIdServiceSales,
};
