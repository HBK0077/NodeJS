const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const sequelize=require("./util/database")

const expenseDetails=require("./routes/expenses")
const premiumFeatureDetails = require("./routes/premium-feature-route");
const premiumDetails = require("./routes/premium-route");
const userDetails = require("./routes/user-routes");
const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/orders");

const app=express();
app.use(cors());
app.use(bodyparser.json())

app.use(expenseDetails)
app.use(userDetails);
app.use(premiumDetails);
app.use(premiumFeatureDetails);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then(()=>{
    app.listen(2500)
})