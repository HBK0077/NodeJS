const express=require("express")
const routes=express.Router()
const admin=require("../controllers/admin")


routes.post("/add-data",admin.addmethod)

routes.get("/show-data",admin.getmethod)

routes.put("/buy-data1/:id",admin.buy1data);
routes.put("/buy-data2/:id",admin.buy2data);
routes.put("/buy-data3/:id",admin.buy3data);

module.exports=routes;