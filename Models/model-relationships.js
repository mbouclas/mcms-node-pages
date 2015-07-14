module.exports =  {
    categories : {
        as : 'categories',
        join : 'getPageCategories',
        onSource : 'id',
        onDest : '_id',
        inject : 'categories',
        attachment : 'value',
        extraParams : {}
    },
    ExtraFields : {
        as : 'ExtraFields',
        join : 'getPageExtraFields',
        onSource : 'id',
        onDest : 'id',
        inject : 'ExtraFields'
    },
    related : {
        as : 'related',
        join : 'getPageRelated',
        onSource : 'id',
        onDest : 'id',
        inject : 'related'
    },
    thumb : {
        as : 'thumb',
        join : 'getPageThumb',
        onSource : 'id',
        onDest : '_id',
        inject : 'thumb',
        return : 'single'
    },
    images : {
        as : 'images',
        join : 'getPageImages',
        onSource : 'id',
        onDest : 'id',
        inject : 'mediaFiles.images'
    },
    itemsCount : {
        as : 'itemCount',
        join : 'countItems',
        onSource : 'id',
        onDest : 'id',
        inject : 'categories',
        attachment : 'count',
        return : 'single',
        extraParams : {}
    }
};