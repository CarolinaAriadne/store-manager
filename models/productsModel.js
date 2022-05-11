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

const getProductName = async (name) => {
    const query = 'SELECT * FROM StoreManager.products WHERE name = ?;';
    const [response] = await connection.execute(query, [name]);
    return response;
};

const createNameModel = async (name, quantity) => {
    const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?);';
    
    const [response] = await connection.execute(query, [name, quantity]);

    return response.insertId;
};

const getProductIdUp = async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [response] = await connection.execute(query, [id]);
    return response;
};

const updateProductModel = async (id, name, quantity) => {
    const query = 'UPDATE products SET name=?, quantity=? WHERE id = ?;';
    await connection.execute(query, [name, quantity, id]);
    return id;
};

const deleteProductModel = async (id) => {
    const query = 'DELETE FROM products WHERE id = ?;';
    await connection.execute(query, [id]);
    // console.log(id, 'id model');
};

module.exports = { getAllProductsModel,
getByIdProductsModel, 
getProductName,
createNameModel,
getProductIdUp,
updateProductModel,
deleteProductModel, 
};