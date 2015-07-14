(function() {
    angular.module('mcms.pages.page')
        .directive('editPage', editPage);

    editPage.$inject = ['pagesConfig'];
    editPageController.$inject = ['pages.pageService','$timeout','pagesConfig','$routeParams','$rootScope','lodashFactory'];

    function editPage(Config) {
        return {
            controller: editPageController,
            templateUrl: Config.appUrl + "Pages/editPage.directive.html",
            scope : {},
            restrict : 'E',
            controllerAs: 'VM'
        };

    }

    function editPageController(Page,$timeout,Config,$routeParams,$rootScope,lo){
        var vm = this;
        vm.redactorConfig = Config.redactor;
        vm.Page = {};
        vm.categories = Page.Categories;


        if ($routeParams.id){
            Page.get($routeParams.id).then(function(page){
                vm.Page = page;
                $rootScope.$broadcast('page.loaded',page);
            });
        }

        vm.categoriesChange = function(item){
            if (!vm.Page.categories){
                vm.Page.categories = [];
            }

            if (lo.find(vm.Page.categories,{id : item.id})){
                return;
            }

            vm.Page.categories.push(item);
        };

        vm.removeCategoryFromModel = function(category){
            vm.Page.categories.splice(lo.findIndex(vm.Page.categories,{id : category.id}),1);
        };

        vm.savePage = function(){
            Page.save(vm.Page)
                .then(function (res) {
                    vm.success = true;
                    $timeout(function(){
                        vm.success = false;
                    },5000);
                });
        }
    }
})();