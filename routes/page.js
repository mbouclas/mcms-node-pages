module.exports = (function(App,Route,Package){
    var express = require('express');
    var router = express.Router();
    var Controllers = App.Controllers.mcmsNodePages,
        categoryServices = App.Services['mcmsNodePages'].Category;

    router.post('/find' ,function(req, res, next) {
        res.render('partials/index.html', { title: 'Admin', flash : req.flash() });
    });

    router.get('/findOne' ,Controllers['Page/Page'].findOne);
    router.post('/getPage' ,Controllers['Page/Page'].findOne);
    router.post('/allPages' ,Controllers['Page/Page'].find);
    router.post('/initPages' ,Controllers['Page/Page'].init);
    router.post('/create' ,Controllers['Page/Page'].create);
    router.post('/update' ,Controllers['Page/Page'].update);

    return router;
});