const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const sequelize=require("./util/database")

const expenseDetails=require("./routes/expenses")

const app=express();
app.use(cors());
app.use(bodyparser.json())

app.use(expenseDetails)

sequelize.sync().then(()=>{
    app.listen(2500)
})