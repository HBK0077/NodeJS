const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const sequelize=require("./util/database")

const inventoryDetails=require("./routes/inventory")

const app=express();
app.use(cors());
app.use(bodyparser.json())

app.use(inventoryDetails);

sequelize.sync().then(()=>{
    app.listen(7020);
})