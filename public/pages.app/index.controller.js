(function(){
    angular.module('mcms.pages')
        .controller('pagesCtrl',pagesCtrl);

    pagesCtrl.$inject = ['$rootScope','logger','pageTitle','pages.pageService','$timeout'];

    function pagesCtrl($rootScope,logger,pageTitle,pageService,$timeout){
        var vm = this;



        pageService.getPages()
            .then(function(pages){
                vm.pages = pages.items;
                vm.itemCount = pages.itemCount;
                vm.pagination = pages.pagination;
                console.log(pages)
        });

        pageTitle.set('Pages');

    }


})();