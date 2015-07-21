module.exports = (function(App,Connection,Package){
    return function(ids,callback){

        return App.Helpers.MongoDB.itemImages(App.Connections[App.Config.database.default].models.PageImage,ids,{},function(err,res){
            callback(null,res);
        });
    }
});