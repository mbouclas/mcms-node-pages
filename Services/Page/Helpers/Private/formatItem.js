module.exports = (function(App,Connection,Package){
    var slug = require('slug'),
        lo = require('lodash');

   return function(data){
       if (data.thumb){//sanitize input coming from the admin ui
           var tempThumb = lo.clone(data.thumb);
           data.thumb = {
               id : App.Helpers.MongoDB.idToObjId(tempThumb.id),
               title : tempThumb.title || '',
               alt : tempThumb.alt || ''
           };
       }

       if (data.mediaFiles && lo.isArray(data.mediaFiles.images)){//sanitize images
           var tempImages = lo.clone(data.mediaFiles.images);
           data.mediaFiles.images = [];
           for (var i in tempImages){
               data.mediaFiles.images.push({
                   id : App.Helpers.MongoDB.idToObjId(tempImages[i].id),
                   title : tempImages[i].title || '',
                   alt : tempImages[i].alt || '',
                   orderBy : tempImages[i].orderBy || i,
                   active : tempImages[i].active || false
               });
           }
       }

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