module.exports = (function(App,Package){
    var defaultDB = App.Config.database.default,
        Connection = App.Connections[defaultDB],
        privateMethods = {
            getPageThumb : require('./Helpers/Private/getPageThumb')(App,Connection,Package),
            getPageImages : require('./Helpers/Private/getPageImages')(App,Connection,Package),
            getPageCategories : require('./Helpers/Private/getPageCategories')(App,Connection,Package),
            getPageRelated : require('./Helpers/Private/getPageRelated')(App,Connection,Package),
            getPageExtraFields : require('./Helpers/Private/getPageExtraFields')(App,Connection,Package)
        };



    return {
        name : 'Page',
        nameSpace : 'Page',
        findOne : require('./Helpers/findOne')(App,Connection,Package,privateMethods),
        find : require('./Helpers/find')(App,Connection,Package,privateMethods),
        findOrCreate : require('./Helpers/findOrCreate')(App,Connection,Package,privateMethods),
        create : require('./Helpers/create')(App,Connection,Package,privateMethods),
        delete : require('./Helpers/delete')(App,Connection,Package,privateMethods),
        update : require('./Helpers/update')(App,Connection,Package,privateMethods),
        settings : require('./Helpers/settings')(App,Connection,Package,privateMethods)
    };
});