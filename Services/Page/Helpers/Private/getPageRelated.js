module.exports = (function(App,Connection,Package){
    return function(ids,callback) {
        App.Connections[App.Config.database.default].models.Page.where('_id')
            .in(App.Helpers.MongoDB.arrayToObjIds(ids))
            .exec(callback);
    }
});