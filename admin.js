// const path = require('path');
// const express = require('express');

// //const rootDir = require('../util/path');

// const router = express.Router();    

// router.get("/add-product",(req,res,next)=>{
//     //console.log("Inside middleware");
//     //res.send('<form action="/product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">Add Product</button></form>');
//     res.sendFile(path.join(__dirname,'../','views','add-product.html'));
// });

// router.post("/add-product",(req,res,next)=>{
//     console.log(req.body);
//     res.redirect("/");
// });

// module.exports = router;
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(__dirname,'../', 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;