const salesModel = require('../models/salesModel');

const erroHandler = (status, message) => ({
    status,
    message,
});

const getAllServiceSales = async () => {
    const salesAll = await salesModel.getAllSalesModel();
    console.log(salesAll);
    if (salesAll.length === 0) {
        throw erroHandler(404, 'Sale not found');
    }
    return salesAll;
};

const getByIdServiceSales = async (id) => {
    const salesById = await salesModel.getByIdSalesModel(id);

    console.log(salesById);
   
    if (salesById.length === 0) {
        throw erroHandler(404, 'Sale not found');
    }
 
    return salesById;
};

const registerSalesService = async (sale, saleId, productId, quantity) => {
    const salesRegister = await salesModel.registerSalesModel(sale);
    console.log('aqui', salesRegister);
    const saleSent = salesModel.registerSalesProductModel(saleId, productId, quantity);
    console.log(saleSent);
};

// Promise.all, como vamos fazer a inserção de vários dados no banco, precisamos aguardar todas as requisições serem "resolvidos" até que possamos prosseguir

module.exports = {
    getAllServiceSales,
    getByIdServiceSales,
    registerSalesService,
};
