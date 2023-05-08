const express = require('express');

const router = express.Router();
router.get("/",(req,res,next)=>{
    res.send("<h1>Home Page</h1>");
});
router.use("/",(req,res,next)=>{
    //console.log("Inside another middleware");
    res.status(404).send("<h1>Error Page</h1>");
    next();
    
});



module.exports = router;