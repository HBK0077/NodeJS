const express = require('express');
const routes = express.Router();
const admin = require("../controllers/add-expenses");
const premium = require("../controllers/premium")
const userControl = require("../controllers/user-control");
const userAuthentication = require('../middleware/auth');

const resetpasswordController = require('../controllers/resetpassword');


// routes.get('/updatepassword/:resetpasswordid', resetpasswordController.updatepassword)

// routes.get('/resetpassword/:id', resetpasswordController.resetpassword)

routes.post('/forgotpassword', resetpasswordController.forgotpassword)

module.exports = routes;