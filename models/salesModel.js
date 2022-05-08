// const connection = require('./connection');

const getAllSalesModel = async () => {
    // const query = `SELECT sa.id , sp.sale_id, p.id, sp.product_id, sp.quantity
    // FROM sales AS sa
    // JOIN sales_products AS sp ON sa.id = sp.sale_id
    // JOIN products AS p  ON p.id = sp.product_id
    // ORDER BY sa.id, sp.product_id`;
    // const [response] = await connection.execute(query);
    // return response;
};

const getByIdSalesModel = async () => { 
    // const query2 = `SELECT sa.id , sp.sale_id, p.id, sp.product_id, sp.quantity
    // FROM sales AS sa
    // JOIN sales_products AS sp ON sa.id = sp.sale_id
    // JOIN products AS p  ON p.id = sp.product_id
    // WHERE id = ?
    // ORDER BY sa.id, sp.product_id`;
    // const [response2] = await connection.execute(query2, [id]);
    // return response2;
};

module.exports = {
    getAllSalesModel,
    getByIdSalesModel,
};