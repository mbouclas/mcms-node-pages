(function(){
    'use strict';

    angular.module('mcms.pages')
        .service('pages.dataService',dataService);

    dataService.$inject = ['core.dataService','pagesConfig'];


    function dataService(baseService,Config){
        var dataServiceObj;
        dataServiceObj = Object.create(new baseService({
            apiUrl : Config.apiUrl
        }));

        dataServiceObj.getAllPages = getAllPages;
        dataServiceObj.init = init;
        dataServiceObj.create = create;
        dataServiceObj.update = update;

        return dataServiceObj;
    }

    function init(){
        return this.Post('initPages').then(this.responseSuccess);
    }

    function getAllPages(options){
        return this.Post('allPages',options);
    }

    function create(data){
        return this.Post('create',{data: data}).then(this.responseSuccess);
    }

    function update(id,data){
        return this.Post('update',{id : id,data : data}).then(this.responseSuccess);
    }

})();