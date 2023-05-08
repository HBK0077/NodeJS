const express = require('express');

const bodyParser = require('body-parser');

const app = express();

//body parsing should be done at the beginning of the middlewares.

app.use(bodyParser.urlencoded({extended: false}));

app.use("/add-product",(req,res,next)=>{
    //console.log("Inside middleware");
    res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">Add Product</button></form>');
});

app.use("/product",(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
});

app.use("/",(req,res,next)=>{
    //console.log("Inside another middleware");
    res.send("<h1>Hello from Express JS</h1>");
});

app.listen(5000);
