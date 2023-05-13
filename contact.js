const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');
const contactController = require('../controllers/call');

const router = express.Router();


router.get('/contact', contactController.getContact);


router.post('/contact', contactController.postContact);

module.exports = router;