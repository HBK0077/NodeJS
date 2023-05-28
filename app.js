const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const sequelize=require("./util/database")

const expenseDetails=require("./routes/expenses")
const User = require("./models/user");
const Expense = require("./models/expense");

const app=express();
app.use(cors());
app.use(bodyparser.json())

app.use(expenseDetails)

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync().then(()=>{
    app.listen(2500)
})