// const express = require('express');
// const path = require('path');

// const bodyParser = require('body-parser');

// const adminRouter = require('./routes/admin');

// const shopRouter = require('./routes/shop');

// const app = express();

// //body parsing should be done at the beginning of the middlewares.

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname,'public')));

// app.use(adminRouter);

// app.use(shopRouter);


// app.listen(5000);
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes = require('./routes/contact');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'pagenotfound.html'));
});

app.listen(5000);
