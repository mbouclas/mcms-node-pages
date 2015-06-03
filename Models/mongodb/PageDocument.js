module.exports = function (mongoose, modelName) {
    var schema = mongoose.Schema({
        file: String,
        title : String,
        created_at: {type : Date, default : Date.now},
        updated_at: {type : Date, default : Date.now},
        details : {},
        settings: {}
    }, {
        strict: false,
        id : true
    });

    schema.set('toObject', { getters: true });
    schema.set('toJSON', { getters: true });

    mongoose.model(modelName, schema);

};