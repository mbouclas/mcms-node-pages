module.exports = (function(App,Express,Package){
    var Route = App.Route;
    var names = {
        ApiHome : '/api'
    };
    Route.set(names);
    Express.use(Route.use);
    Express.use('/admin/api/pages',[App.Auth.middleware.isAdmin],require('./routes/page')(App,Route,Package));

});
