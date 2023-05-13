const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const productController = require('../controllers/products');
const adminData = require('./admin');

const router = express.Router();

router.get('/', productController.getProducts);

module.exports = router;
