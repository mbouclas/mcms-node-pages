module.exports = (function(App,Package){
    return {
        name : 'Page',
        nameSpace : 'Page',
        findOne : findOne,
        find : find
    };

    function findOne(req,res,next){
        var Page = App.Services['mcmsNodePages'].Page;
        Page.findOne({},function(err,result){
            res.send(result).status(200);
        });
    }

    function find(req,res,next){
        var Page = App.Services['mcmsNodePages'].Page;
        var filters = {};
        Page.find(filters,function(err,result){
            res.send(result).status(200);
        });
    }
});