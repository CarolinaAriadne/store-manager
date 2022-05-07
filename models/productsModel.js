const connection = require('./connection');

const getAllProductsModel = async () => {
    const query = 'SELECT * FROM products;';
    const [response] = await connection.execute(query);
    return response;
};

const getByIdProductsModel = async (id) => {
    const query2 = 'SELECT * FROM products WHERE id = ?;';
    const [response2] = await connection.execute(query2, [id]);
    return response2;
};

module.exports = { getAllProductsModel, getByIdProductsModel };