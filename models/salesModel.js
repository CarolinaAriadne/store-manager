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

const registerSalesModel = async (sale) => {
    const querySales = 'INSERT INTO StorageManager.sales...;';
    const [response] = await connection.execute(querySales);
    return response;

    // const query = `SELECT pr.id as productId, sp.quantity
    // FROM sales_products AS sp
    // JOIN products AS pr ON pr.id = sp.product_id
    // WHERE sp.product_id = ?`;
    // const [response] = await connection.execute(query, [productId, quantity]);
    // console.log('aqui response model', response);
    // return response;
};

module.exports = {
    getAllSalesModel,
    getByIdSalesModel,
    registerSalesModel,
};