const express = require('express');

const { validateDadosErro400, validateDadosErro422 } = require('../middlewares/validateProducts');

const { getAllControllerProducts, 
getByIdControllerProducts, createName } = require('../controllers/productsController');

const { getAllControllerSales, getByIdControllerSales } = require('../controllers/salesController');

const router = express.Router();

router.get('/products', getAllControllerProducts);

router.get('/products/:id', getByIdControllerProducts);

router.get('/sales', getAllControllerSales);

router.get('/sales/:id', getByIdControllerSales);

router.post('/products', validateDadosErro400, validateDadosErro422, createName);

module.exports = router;
