const connection = require('./connection');

const getAllProductsModel = async () => {
    const query = 'SELECT * FROM StoreManager.products;';
    const [response] = await connection.execute(query);
    return response;
};

const getByIdProductsModel = async (id) => {
    const query2 = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [response] = await connection.execute(query2, [id]);
    return response[0];
};

module.exports = { getAllProductsModel, getByIdProductsModel };