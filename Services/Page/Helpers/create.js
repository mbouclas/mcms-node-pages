module.exports = (function(App,Connection,Package,privateMethods){
    var Model = Connection.models.Page,
        lo = require('lodash'),
        async = require('async');

    function create(data,callback){
        var page = privateMethods.formatItem(data);
        if (!lo.isObject(page)){
            return callback(page);//error
        }

        var asyncArr = [
            checkForExistingPermalink.bind(null,page),
            savePage
        ];

        async.waterfall(asyncArr,callback);

    }

    function checkForExistingPermalink(data,next){
        Model.findOne({permalink:data.permalink}).exec(function(err,res){
            if (res){
                return next('permalinkExists');
            }

            next(null,data);
        });
    }

    function savePage(data,next){
        new Model(data).save(function (err, page) {
            if (err) {
                return next(err);
            }

            next(null, page);
        });
    }

    return create;
});