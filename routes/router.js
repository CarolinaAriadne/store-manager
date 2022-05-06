const express = require('express');

const { getAllProducts, getProducstById } = require('../controllers/productsController');
const { getAllSales, getSalesById } = require('../controllers/salesController');

const router = express.Router();

router.get('/products', getAllProducts);

router.get('/products/:id', getProducstById);

router.get('/sales', getAllSales);

router.get('sales/:id', getSalesById);

module.exports = router;