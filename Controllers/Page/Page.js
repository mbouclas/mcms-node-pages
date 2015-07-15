module.exports = (function(App,Package){
    var packageName = Package.name,
        pageServices = App.Services['mcmsNodePages'].Page,
        categoryServices = App.Services['mcmsNodePages'].Category,
        Cache = {};


    return {
        name : 'Page',
        nameSpace : 'Page',
        findOne : findOne,
        find : find,
        init : init,
        create : create,
        update : update,
        upload : upload
    };

    function init(req,res,next){
        categoryServices.find({permalink:Package.name},function(err,categories){
           res.send({
               categories : categories
           });
        });
    }

    function findOne(req,res,next){
        pageServices.findOne(req.body.id,{},function(err,item){

            if (err){
                return res.status(409).send({success:false, error : err});
            }
            res.send(item.page);
        });
    }

    function find(req,res,next){
        var page = parseInt(req.params.page) || 1;
        var limit = 12;//move it to options file
        var permalink = req.body.permalink || null;
        pageServices.find({permalink : permalink},{with : ['countItems'],page:page,limit : limit},function(err,result){


            if (err){
                return res.status(409).send({success:false, error : err});
            }


            var toServe = {
                items : result.items,
                itemCount : result.count,
                pagination : App.Helpers.common.pagination(result.count,limit,page)
            };

            res.send(toServe);
        });
    }

    function create(req,res,next){

        req.body.data.uid = req.user.uid;
        pageServices.create(req.body.data,function(err,result){
            if (err){
                return res.status(409).send({success:false, error : err});
            }

            res.send(result);
        });

    }

    function update(req,res,next){
        if (!req.body.id){
            return res.status(409).send({success:false, error : 'noId'});
        }

        req.body.data.uid = req.user.uid;
        pageServices.update(req.body.id,req.body.data,function(err,result){
            if (err){
                return res.status(409).send({success:false, error : err});
            }

            res.send(result);
        });
    }

    function upload(req,res,next){
        console.log(req.body);
        res.send(req.files);
    }
});