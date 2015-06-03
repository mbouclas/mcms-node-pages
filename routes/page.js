module.exports = (function(App,Route){
    var express = require('express');
    var router = express.Router();
    var Controllers = App.Controllers.mcmsNodePages;

    router.post('/find' ,function(req, res, next) {
        res.render('partials/index.html', { title: 'Admin', flash : req.flash() });
    });

    router.get('/findOne' ,Controllers['Page/Page'].findOne);

    return router;
});