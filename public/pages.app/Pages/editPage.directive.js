(function() {
    angular.module('mcms.pages.page')
        .directive('editPage', editPage);

    editPage.$inject = ['pagesConfig'];
    editPageController.$inject = ['pages.pageService','$timeout','pagesConfig','$routeParams','$rootScope','lodashFactory','configuration'];

    function editPage(Config) {
        return {
            controller: editPageController,
            templateUrl: Config.appUrl + "Pages/editPage.directive.html",
            scope : {},
            restrict : 'E',
            controllerAs: 'VM'
        };

    }

    function editPageController(Page,$timeout,Config,$routeParams,$rootScope,lo,BaseConfig){
        var vm = this;
        vm.redactorConfig = Config.redactor;
        var thumb = {
            copies : {
                thumb : {}
            }
        };
        vm.categories = Page.Categories;
        vm.uploadOptions = BaseConfig.fileTypes.image;
        if ($routeParams.id){
            Page.get($routeParams.id).then(function(page){
                vm.Page = page;
                $rootScope.$broadcast('page.loaded',page);

                vm.uploadConfig = {
                    url : Config.apiUrl + 'upload',
                    fields : {
                        id : $routeParams.id
                    }
                };
            });
        }

        $rootScope.$on('file.upload.progress',function(e,file,progress){//monitor file progress

        });

        $rootScope.$on('file.upload.added',function(e,files){//new files added
            //$rootScope.$broadcast('file.upload.startUpload',files);//could be bound on a button
        });

        vm.onUploadDone = function(file,response){//handle the after upload shit
            console.log(arguments);
            if (!vm.Page.thumb){
                vm.Page.thumb = thumb;
            }

            vm.Page.thumb.copies.thumb = {
                imageUrl : response.uploadedFile.path
            }
        };

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