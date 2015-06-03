module.exports = (function(App,Connection,Package){
    return function(thumb,callback){
        return App.Helpers.MongoDB.itemThumb(App.Connections[App.Config.database.default].models.PageImage,thumb,null,callback);
    }
});