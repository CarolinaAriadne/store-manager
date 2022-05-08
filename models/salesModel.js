const connection = require('./connection');

const getAllSalesModel = async () => {
    const query = `SELECT sp.sale_id as saleId, date, sp.product_id AS productId, 
    sp.quantity
    FROM sales AS sa
    JOIN sales_products AS sp ON sa.id = sp.sale_id
    ORDER BY sa.id, sp.product_id;`;
    const [response] = await connection.execute(query);
    return response;
};

const getByIdSalesModel = async (id) => { 
    const query2 = `SELECT   date, sp.product_id AS productId, 
    sp.quantity
    FROM sales AS sa
    JOIN sales_products AS sp ON sa.id = sp.sale_id
    ORDER BY sa.id, sp.product_id;`;
    const [response2] = await connection.execute(query2, [id]);
    return response2;
};

module.exports = {
    getAllSalesModel,
    getByIdSalesModel,
};