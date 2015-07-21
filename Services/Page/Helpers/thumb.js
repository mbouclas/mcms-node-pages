module.exports = (function(App,Connection,Package,privateMethods){
    var async = require('async');
    var Id,
        File,
        Config = App.Config.image.pages,
        Page = App.Connections.mongodb.models.Page,
        Image = App.Connections.mongodb.models.PageImage;

    return function(id,file,callback){
        Id = id;
        File = file;

        var asyncArr = [
            findItem.bind(null,id),
            handleUpload,
            saveImageToDB,
            saveThumbToItem
        ];

        async.waterfall(asyncArr,function(err,result){
            App.Event.emit('cache.reset.object',Package.packageName,id);
            callback(err,result);
        });

    };


    function findItem(id,next){
        Page.findOne({_id : App.Helpers.MongoDB.idToObjId(id)}).exec(next);
    }

    function handleUpload(item,next){
        App.Helpers.handleImageUpload(File,Config,item,next);
    }

    function saveImageToDB(thumb,next){
        //thumb comes straight from the handle upload service
        new Image(thumb).save(function(err,doc){
            next(null,doc);
        });

    }

    function saveThumbToItem(thumb,next){
        Page.update({_id : App.Helpers.MongoDB.idToObjId(Id)},{$set : {thumb : {id : App.Helpers.MongoDB.idToObjId(thumb._id)}}},function (err) {
            if (err) {
                return next(err);
            }

            next(null, thumb);
        });
    }
});