const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const sequelize=require("./util/database")


const expenseDetails=require("./routes/expenses")
const premiumFeatureDetails = require("./routes/premium-feature-route");
const premiumDetails = require("./routes/premium-route");
const userDetails = require("./routes/user-routes");
const resetPassword = require("./routes/reset-password")


const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/orders");
const forgotPassword = require("./models/forgotpassword");
const downloadFile = require("./models/download");

const app=express();
app.use(cors());
app.use(bodyparser.json())

app.use(expenseDetails)
app.use(userDetails);
app.use(premiumDetails);
app.use(premiumFeatureDetails);
app.use(resetPassword);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forgotPassword);
forgotPassword.belongsTo(User);

User.hasMany(downloadFile);
downloadFile.belongsTo(User);

sequelize.sync().then(()=>{
    app.listen(2500)
})