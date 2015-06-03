var lo = require('lodash');
var items = [
    {
        "title" : "quis at sapiente a velit omnis voluptatem rem esse ipsum",
        "categories" : "552d36b5589e608c457a9de8"
    },
    {
        "title" : "quis at sapiente a velit omnis voluptatem rem esse ipsum",
        "categories" : "552d36b5589e608c457a9deb"
    },
    {
        "title" : "quis at sapiente a velit omnis voluptatem rem esse ipsum",
        "categories" : "552d36b5589e608c457a9dea"
    },
    {
        "title" : "quis at sapiente a velit omnis voluptatem rem esse ipsum",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "quis at sapiente a velit omnis voluptatem rem esse ipsum",
        "categories" : "552d36b5589e608c457a9deb"
    },
    {
        "title" : "eveniet labore rerum sed sunt deserunt molestiae",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "doloremque eveniet aut voluptatem qui ut et est aut quasi",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "doloremque eveniet aut voluptatem qui ut et est aut quasi",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "corrupti dicta incidunt saepe quidem nam nihil voluptates repudiandae aut aspernatur",
        "categories" : "552d36b2589e608c457a9de7"
    },
    {
        "title" : "corrupti dicta incidunt saepe quidem nam nihil voluptates repudiandae aut aspernatur",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "corrupti dicta incidunt saepe quidem nam nihil voluptates repudiandae aut aspernatur",
        "categories" : "552d36b2589e608c457a9de7"
    },
    {
        "title" : "corrupti dicta incidunt saepe quidem nam nihil voluptates repudiandae aut aspernatur",
        "categories" : "552d36b5589e608c457a9deb"
    },
    {
        "title" : "corrupti dicta incidunt saepe quidem nam nihil voluptates repudiandae aut aspernatur",
        "categories" : "552d36b5589e608c457a9deb"
    },
    {
        "title" : "numquam excepturi cum in modi facilis at et repudiandae est veritatis recusandae",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "numquam excepturi cum in modi facilis at et repudiandae est veritatis recusandae",
        "categories" : "552d36b2589e608c457a9de7"
    },
    {
        "title" : "numquam excepturi cum in modi facilis at et repudiandae est veritatis recusandae",
        "categories" : "552d36b5589e608c457a9de8"
    },
    {
        "title" : "pariatur velit quasi sed corporis non neque aut voluptate voluptatibus explicabo nihil",
        "categories" : "552d36b5589e608c457a9de8"
    },
    {
        "title" : "pariatur velit quasi sed corporis non neque aut voluptate voluptatibus explicabo nihil",
        "categories" : "552d36b5589e608c457a9dea"
    },
    {
        "title" : "pariatur velit quasi sed corporis non neque aut voluptate voluptatibus explicabo nihil",
        "categories" : "552d36b2589e608c457a9de7"
    },
    {
        "title" : "pariatur velit quasi sed corporis non neque aut voluptate voluptatibus explicabo nihil",
        "categories" : "552d36b5589e608c457a9dea"
    },
    {
        "title" : "pariatur velit quasi sed corporis non neque aut voluptate voluptatibus explicabo nihil",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "exercitationem tempora ut voluptatum at temporibus",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "nihil veritatis facere soluta harum dolor",
        "categories" : "552d36b2589e608c457a9de7"
    },
    {
        "title" : "nihil veritatis facere soluta harum dolor",
        "categories" : "552d36b6589e608c457a9ded"
    },
    {
        "title" : "nihil veritatis facere soluta harum dolor",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "nihil veritatis facere soluta harum dolor",
        "categories" : "552d36b5589e608c457a9de9"
    },
    {
        "title" : "nihil veritatis facere soluta harum dolor",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "ratione nulla aut quia voluptas labore est",
        "categories" : "552d36b6589e608c457a9ded"
    },
    {
        "title" : "ratione nulla aut quia voluptas labore est",
        "categories" : "552d36b6589e608c457a9dec"
    },
    {
        "title" : "ratione nulla aut quia voluptas labore est",
        "categories" : "552d36b6589e608c457a9dec"
    }
];

var found = lo.where(items,{categories : "552d36b6589e608c457a9dec"});

console.log(found)
pages.aggregate([{'$match': {categories: {'$in':
    [
        ObjectId("552d36b5589e608c457a9deb"), ObjectId("552d36b5589e608c457a9dea"), ObjectId("552d36b5589e608c457a9de8"), ObjectId("552d36b5589e608c457a9de9"), ObjectId("552d36b6589e608c457a9dec"),
        ObjectId("552d36b6589e608c457a9dee"),
        ObjectId("52d36b6589e608c457a9ded")]
}}}, {
    '$project': {
        _id: 0,
        categories: 1
    }
}, {'$unwind': '$categories'}, {'$match': {categories: {'$in': [
    ObjectId("552d36b5589e608c457a9deb"), ObjectId("552d36b5589e608c457a9dea"), ObjectId("552d36b5589e608c457a9de8"), ObjectId("552d36b5589e608c457a9de9"), ObjectId("552d36b6589e608c457a9dec"),
    ObjectId("552d36b6589e608c457a9dee"),
    ObjectId("52d36b6589e608c457a9ded")]}}}, {
    '$group': {
        _id: {
            items: '$id',
            categories: '$categories'
        }, count: {'$sum': 1}
    }
}, {'$group': {_id: {items: '$_id.categories'}, count: {'$sum': 1}}}])