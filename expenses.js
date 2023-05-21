//here we define the routes for get post of the expesnse.
const express = require("express");
const routes = express.Router();
const admin = require("../controllers/admin");

routes.post("/add-expenses", admin.addExpenses);

routes.get("/show-expenses", admin.getExpenses);

routes.delete("/delete-expenses/:id", admin.deleteExpense);

module.exports = routes;