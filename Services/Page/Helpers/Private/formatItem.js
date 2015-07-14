module.exports = (function(App,Connection,Package){
    var slug = require('slug');

   return function(data){
       var page = {
           title : data.title,
           permalink : slug(data.title,{lower: true}),
           description : data.description || '',
           description_long : data.description_long || '',
           active : data.active || false,
           uid : App.Helpers.MongoDB.idToObjId(data.uid),
           categories : [],
           mediaFiles : data.mediaFiles || {
               images : [],
               documents : [],
               videos : []
           },
           thumb : data.thumb || {}
       };

       if (!data.categories || data.categories.length == 0){
           return 'noCategories';
       }

       for (var i in data.categories){
           page.categories.push(App.Helpers.MongoDB.idToObjId(data.categories[i]._id));
       }

       return page;
   }
});