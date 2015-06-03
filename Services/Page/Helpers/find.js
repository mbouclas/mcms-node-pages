module.exports = (function(App,Connection,Package){
    var async = require('async');
    var lo = require('lodash');
    var Relationships = Package.modelRelationships;
    var PageModel = Connection.models.Page,
        CategoryModel = Connection.models.Category,
        returnObj = {},
        filters = {},
        Options = {};

    function find(catId,options,callback){
        var asyncArr = [];
        Options = options;

        if (typeof catId.permalink != 'undefined' && !lo.isObject(catId.permalink)){
            asyncArr.push(getCategoryByPermalink.bind(null,catId.permalink));
        }

        asyncArr.push(getItems);

        if (lo.isArray(options.with)){
            asyncArr.push(countItems);
        }

        async.waterfall(asyncArr,function(err,results){
            if (err){
                return callback(err);
            }
            callback(null,returnObj);
        });
    }

    function getCategoryByPermalink(permalink,next){
        CategoryModel.findOne({permalink : permalink}).exec(function(err,category){
            if (!category){
                return next('noCategoryFound');
            }

            returnObj.category = category;
            next(null,category);
        });
    }

    function countItems(filters,next){
        PageModel.count(filters).exec(function(err,count){
            returnObj.count = count;
            next(null,count);
        });
    }

    function getItems(category,next){
        var page = Options.page || 1;
        var limit = Options.limit || 10;
        var sort = (Options.sort) ? Options.sort : 'created_at';
        var way = (Options.way) ? Options.way : '-';
        filters = (Options.filters) ? Options.filters : {};
        var simplified = (Options.simplified) ? Options.simplified : false;

        filters.categories = {
            type : 'equals',
            value : category.id || category['_id']
        };

        filters.categories.value = App.Helpers.MongoDB.idToObjId(filters.categories.value);
        var searchFor = App.Helpers.MongoDB.setupFilters(filters);
        PageModel.find(searchFor)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(way + sort)
            .exec(function(err,items){
                if (err){
                    return next(err);
                }

                returnObj.items = items;
                next(err,searchFor);
            });
    }

    return find;
});

