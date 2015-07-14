(function(){
    'use strict';

    angular.module('mcms.pages')
        .service('pages.pageService',pageService);

    pageService.$inject = ['pages.dataService','pagesConfig','$rootScope','lodashFactory'];

    function pageService(dataService,Config,$rootScope,lo){
        var PageService = {
            loaded : false,
            Categories : [],
            CategoriesById : {},
            init : init,
            save : save,
            getPages : getPages,
            get : get
        };

        return PageService;

        function init(){
            var _this = this;
            return dataService.init().then(function(res){
                PageService.Categories = res.categories;
                for (var i in PageService.Categories){
                    PageService.CategoriesById[PageService.Categories[i].id] = PageService.Categories[i];
                }

                $rootScope.$broadcast('pages.init.done');
                $rootScope.pagesAppDone = true;
                _this.loaded = true;
                return res;
            });
        }

        function save(data){
            if (!data.id){
                return dataService.create(data)
                    .then(function (res) {
                    });
            }

            return dataService.update(data.id,data);
        }

        function getPages(options){
            options = lo.merge({
                page : 1
            },options);

            return dataService.Post('allPages',options)
                .then(dataService.responseSuccess);
        }

        function get(id){
            return dataService.Post('getPage',{id : id})
                .then(dataService.responseSuccess);
        }
    }


})();