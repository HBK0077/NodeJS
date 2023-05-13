exports.getContact = (req, res, next) => {
    res.sendFile(path.join(__dirname,'../', 'views', 'contact.html'));
};

exports.postContact = (req, res, next) => {
    //console.log(req.body);
    res.sendFile(path.join(__dirname,'../','views','success.html'));
    //res.redirect('/');
};