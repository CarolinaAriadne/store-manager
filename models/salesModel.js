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
    console.log(response);
    return response.insertId;

    // const query = `SELECT pr.id as productId, sp.quantity
    // FROM sales_products AS sp
    // JOIN products AS pr ON pr.id = sp.product_id
    // WHERE sp.product_id = ?`;
    // const [response] = await connection.execute(query, [productId, quantity]);
    // console.log('aqui response model', response);
    // return response;
};

// const registerSalesProductModel = async (saleId, productId, quantity) => {
//     const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
//      VALUES (?,?,?)`;
//      const [response] = await connection.execute(query, [saleId, productId, quantity]);
//      return response;
// };

module.exports = {
    getAllSalesModel,
    getByIdSalesModel,
    registerSalesModel,
    // registerSalesProductModel,
};
