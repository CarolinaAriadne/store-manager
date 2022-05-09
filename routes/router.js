const express = require('express');

const { validateProduct400, validateProduct422 } = require('../middlewares/validateProducts');

const { validateSales400, validateSales422 } = require('../middlewares/validateSales');

const { getAllControllerProducts, 
getByIdControllerProducts, createName } = require('../controllers/productsController');

const { getAllControllerSales, getByIdControllerSales } = require('../controllers/salesController');

const router = express.Router();

router.get('/products', getAllControllerProducts);

router.get('/products/:id', getByIdControllerProducts);

router.get('/sales', getAllControllerSales);

router.get('/sales/:id', getByIdControllerSales);

router.post('/products', validateProduct400, validateProduct422, createName);

router.post('/sales', validateSales400, validateSales422);

router.put('/products/:id', validateProduct400, validateProduct422);

router.put('/sales/:id', validateSales400, validateProduct422);

module.exports = router;
