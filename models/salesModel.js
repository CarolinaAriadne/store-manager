const connection = require('./connection');

const getAllSalesModel = async () => {
    const query = 'SELECT * FROM sales;';
    const [response] = await connection.execute(query);
    return response;
};

const getByIdSalesModel = async (id) => { 
    const query2 = 'SELECT * FROM sales WHERE id = ?;';
    const [response2] = await connection.execute(query2, [id]);
    return response2;
};

module.exports = {
    getAllSalesModel,
    getByIdSalesModel,
};