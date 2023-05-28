//here we define the routes for get post of the expesnse.
const express = require("express");
const routes = express.Router();
const admin = require("../controllers/admin");
const userAuthentication = require('../middleware/auth');
const RazorPay = require('razorpay');

routes.post("/add-expenses", userAuthentication.authenticate, admin.addExpenses);

//adding user 
routes.post("/add-user", admin.addUser);

//login user
routes.post("/user-login", admin.userLogin);

routes.get("/show-expenses", userAuthentication.authenticate ,admin.getExpenses);

routes.delete("/delete-expenses/:id",userAuthentication.authenticate, admin.deleteExpense);

//premium membership
routes.get("/premium-membership", userAuthentication.authenticate, admin.premiumMembership);

//update Transactions
routes.post("/update-transaction-status", userAuthentication.authenticate, admin.updateStatus);

module.exports = routes;