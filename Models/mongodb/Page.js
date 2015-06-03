module.exports = function (mongoose, modelName) {

    // Define your mongoose model as usual...
    var schema = mongoose.Schema({
        title: { type: String, index: true },
        permalink: { type: String, index: true },
        description: String,
        description_long: String,
        active: Boolean,
        created_at: {type : Date, default : Date.now},
        updated_at: {type : Date, default : Date.now},
        uid: String,
        categories : [],
        extraFields : {},
        thumb :{},
        mediaFiles : {},
        related :[],
        translations : {},
        preferences : {}
    }, {
        strict: false,
        id : true
    });

    schema.set('toObject', { getters: true });
    schema.set('toJSON', { getters: true });

    mongoose.model(modelName, schema);
};