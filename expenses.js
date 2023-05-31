//here we define the routes for get post of the expesnse.
const express = require("express");
const routes = express.Router();
const admin = require("../controllers/add-expenses");
const premium = require("../controllers/premium")
const userAuthentication = require('../middleware/auth');
const RazorPay = require('razorpay');

routes.post("/add-expenses", userAuthentication.authenticate, admin.addExpenses);



routes.get("/show-expenses", userAuthentication.authenticate ,admin.getExpenses);

routes.delete("/delete-expenses/:id/:amount",userAuthentication.authenticate, admin.deleteExpense);





module.exports = routes;