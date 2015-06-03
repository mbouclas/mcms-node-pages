module.exports = (function(App,Connection,Package,privateMethods){
    var eagerLoader = require('mcms-node-eager-loader')(),
        Loader = new eagerLoader();
    var async = require('async');
    var Model = Connection.models.Page;

    function findOne(pageID,options,callback){
        var asyncObj = {},
            Relationships = Package.modelRelationships;

        if (arguments.length == 2){
            callback = arguments[1];
        }

        asyncObj.page = function(next){
            Loader.set(privateMethods).with([
                Relationships.categories,
                Relationships.related,
                Relationships.images,
                Relationships.thumb
            ]).
                exec(getPage.bind(null, pageID,null),next);
        };

        async.parallel(asyncObj,function(err,results){
            if (err){
                return callback(err);
            }

            return callback(null,results);
        });
    }

    function getPage(args,options,callback){
        var query,
            searchBy = (typeof args == 'string') ? {_id : App.Helpers.MongoDB.idToObjId(args)} : args;

        if (typeof args == 'string'){
            query = Model.findById(args);
        } else {
            query = Model.findOne(searchBy);
        }

        query.exec(function(err,page){
            if (err){
                console.log(err);
                return callback(err);
            }

            if (page == null){
                return callback('pageNotFound');
            }

            return callback(null,page);
        });
    }

    function findById(id,options,callback) {
        Model.findById(id).exec(function(err,page){
            if (err){
                return callback(err);
            }


            return callback(err,page);
        });
    }

    return findOne;
});