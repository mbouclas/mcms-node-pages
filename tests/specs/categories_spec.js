var assert = require('assert'),
    lo = require('lodash');

describe("User requests a category with permalink",function(){
    var validApp = {
        permalinkIsValid : permalinkIsValid,
        idIsValid : idIsValid
    };

    before(function () {

    });

    describe("Application is valid if...",function(){

        describe("permalink is a valid one",function(){
            it("permalink is a valid string",function(){
                assert(permalinkIsValid('as-sadasf'));
            });
        });

        describe("id is a valid one",function(){
            it("is a valid ID",validApp.permalinkIsValid.bind(null,'1234'));
        });
    });

    describe("Application is invalid if...",function() {
        describe("Permalink is either not a string, or not a well formed string",function(){
            it("permalink is not a string",function(){
                assert(!permalinkIsValid([]));
            });

            it("permalink is not a well formed string",function(){
                assert(!permalinkIsValid('wew e'));
            });
        });
    });
});

function permalinkIsValid(permalink){

    if(!lo.isString(permalink) || permalink.indexOf(' ') != -1){

        return false;
    }


    return true
}

function idIsValid(id,done){
    if (!lo.isString(id)){
        assert(false);
        return callback('this is not a valid id');
    }

    assert(true);
    callback(null,'id is valid');
}