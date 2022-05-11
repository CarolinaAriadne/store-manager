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
    const query2 = `SELECT  date, sp.product_id AS productId, 
    sp.quantity
    FROM sales AS sa
    JOIN sales_products AS sp ON sa.id = sp.sale_id
    WHERE sp.sale_id = ?`;
    // ORDER BY sa.id, sp.product_id; precisa disso? acho q n, porém talvez sim, o teste dirá;
    const [response] = await connection.execute(query2, [id]);
    return response;
};

const registerSalesModel = async () => {
    const querySales = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [response] = await connection.execute(querySales);
    return response.insertId;
};

const registerSalesProductModel = async (saleId, productId, quantity) => {
    const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
     VALUES (?,?,?)`;
     const [response] = await connection.execute(query, [saleId, productId, quantity]);
     return response;
};

// const updateSaleModel = async (id, productId, quantity) => {
//     const querySale = `UPDATE StoreManager.sales_products SET quantity = ?
//     WHERE sale_id=? AND product_id = ?;`; 
//     const [response] = await connection.execute(querySale, [id, productId, quantity]);
//     return response;
// };

module.exports = {
    getAllSalesModel,
    getByIdSalesModel,
    registerSalesModel,
    registerSalesProductModel,
    // updateSaleModel,
};
