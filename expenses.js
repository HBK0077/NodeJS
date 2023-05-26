//here we define the routes for get post of the expesnse.
const express = require("express");
const routes = express.Router();
const admin = require("../controllers/admin");

routes.post("/add-expenses", admin.addExpenses);

//adding user 
routes.post("/add-user", admin.addUser);

//login user
routes.post("/user-login", admin.userLogin);

routes.get("/show-expenses", admin.getExpenses);

routes.delete("/delete-expenses/:id", admin.deleteExpense);

module.exports = routes;