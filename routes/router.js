const express = require('express');

const { validateProduct400, validateProduct422 } = require('../middlewares/validateProducts');

// const { validateSales400, validateSales422 } = require('../middlewares/validateSales');

const { getAllControllerProducts, 
getByIdControllerProducts, createName, 
updateProduct, deletProduct } = require('../controllers/productsController');

const { getAllControllerSales, getByIdControllerSales, 
    registerSales, updateSale } = require('../controllers/salesController');

const router = express.Router();

router.get('/products', getAllControllerProducts);

router.get('/products/:id', getByIdControllerProducts);

router.get('/sales', getAllControllerSales);

router.get('/sales/:id', getByIdControllerSales);

router.post('/products', validateProduct400, validateProduct422, createName);

router.put('/products/:id', validateProduct400, validateProduct422, updateProduct);

router.delete('/products/:id', deletProduct);

router.post('/sales', registerSales);

router.put('/sales/:id', updateSale);

module.exports = router;
