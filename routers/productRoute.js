const express = require('express');
const { createProduct, getAllProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

// POST request to create a new product
router.post('/products', createProduct);

// GET request to fetch all products
router.get('/products', getAllProducts);

// GET request to fetch a product by ID
router.get('/products/:id', getProductById);

module.exports = router;
