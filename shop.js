// const path = require('path');
// const express = require('express');

// const router = express.Router();
// router.get("/",(req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../','views', 'shop.html'));
// });
// router.use("/",(req,res,next)=>{
//     //console.log("Inside another middleware");
//     // res.status(404).send("<h1>Error Page</h1>");
//     // next();
//     res.status(404).sendFile(path.join(__dirname,'../','views','pagenotfound.html'));
// });



// module.exports = router;
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname,'../', 'views', 'shop.html'));
});

module.exports = router;