const express = require('express');

const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');

const shopRouter = require('./routes/shop');

const app = express();

//body parsing should be done at the beginning of the middlewares.

app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRouter);

app.use(shopRouter);





app.listen(5000);
