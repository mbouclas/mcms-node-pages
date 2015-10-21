(function(){
    angular.module('mcms.pages')
        .controller('pagesCtrl',pagesCtrl);

    pagesCtrl.$inject = ['$rootScope','logger','pageTitle','pages.pageService','$timeout'];

    function pagesCtrl($rootScope,logger,pageTitle,pageService,$timeout){
        var vm = this,
            timer = false;
        vm.filters = {
            active : {
                type : 'equals'
            },
            title : {
                type : 'like'
            },
            categories: {
                type : 'in'
            }
        };

        changePage().then(function(){
            vm.categories = pageService.Categories;
        });

        vm.filterItems = function(){
            if (timer){
                $timeout.cancel(timer);
            }

            timer = $timeout(function(){
                changePage(1);//reset page
            },500);
        };

        vm.changePage = function(page){
            changePage(page);
        };

        function changePage(page){
            return pageService.getPages({filters : vm.filters,page : page || 1 })
                .then(function(pages){
                    vm.pages = pages.items;
                    vm.itemCount = pages.itemCount;
                    vm.pagination = pages.pagination;
                });
        }


        pageTitle.set('Pages');

    }


})();