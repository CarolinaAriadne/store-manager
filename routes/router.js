const express = require('express');

const { getAllControllerProducts, 
getByIdControllerProducts } = require('../controllers/productsController');

const { getAllControllerSales, getByIdControllerSales } = require('../controllers/salesController');

const router = express.Router();

router.get('/products', getAllControllerProducts);

router.get('/products/:id', getByIdControllerProducts);

router.get('/sales', getAllControllerSales);

router.get('/sales/:id', getByIdControllerSales);

module.exports = router;