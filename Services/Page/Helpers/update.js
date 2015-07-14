module.exports = (function(App,Connection,Package,privateMethods){
    var Model = Connection.models.Page,
        lo = require('lodash'),
        async = require('async');

    function create(id,data,callback){
        var page = privateMethods.formatItem(data);
        if (!lo.isObject(page)){
            return callback(page);//error
        }

        Model.update({_id : App.Helpers.MongoDB.idToObjId(id)},{$set : page},function (err) {
            if (err) {
                return callback(err);
            }

            callback(null, true);
        });

    }

    return create;
});