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

const registerSalesService = async (sale) => {
    const saleId = await salesModel.registerSalesModel();
    console.log('saleId  service', saleId);
    console.log('sale registra venda', sale);

    const returnPromisse = sale
        .map(({ productId, quantity }) =>
            salesModel.registerSalesProductModel(saleId, productId, quantity));

    await Promise.all(returnPromisse);

    const saleDone = {
        id: saleId,
        itemsSold: sale,
    };

    return saleDone;
};

const updateSaleService = async (id, sale) => {
    const returnPromisse = sale.map(({ productId, quantity }) => 
         salesModel.updateSaleModel(id, productId, quantity));
         await Promise.all(returnPromisse);
        const saleDone = {
            saleId: id,
            itemUpdated: sale,
        };

        return saleDone;
};

module.exports = {
    getAllServiceSales,
    getByIdServiceSales,
    registerSalesService,
    updateSaleService,
};

// testanto requisitos github
