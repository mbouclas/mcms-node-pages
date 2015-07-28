(function() {
    angular.module('mcms.pages.page')
        .directive('generalInformation', generalInformation);

    generalInformation.$inject = ['pagesConfig'];
    generalInformationController.$inject = ['pages.pageService','$scope','$rootScope'
        ,'pagesConfig','$timeout','configuration','lodashFactory'];


    function generalInformation(Config) {

        return {
            templateUrl: Config.appUrl + "Components/editItem/generalInformation.directive.html",
            controller: generalInformationController,
            require: ['^editPage'],
            scope: {},
            restrict : 'E',
            link : generalInformationLink,
            controllerAs: 'VM'
        };

    }

    function generalInformationLink(scope, elem, attrs, editPageController){

    }

    function generalInformationController(Page,$scope,$rootScope,Config,$timeout,BaseConfig,lo){
        var vm = this;
        vm.redactorConfig = Config.redactor;
        var thumb = {
                copies : {
                    thumb : {}
                }
            },
            mediaFiles = {
                images : [],
                documents : []
            };
        vm.categories = Page.Categories;
        vm.uploadOptions = BaseConfig.fileTypes.image;

        $rootScope.$on('page.loaded',function(event,page){
            vm.Page = page;
            vm.uploadConfig = {
                url : Config.apiUrl + 'uploadThumb',
                fields : {
                    id : page._id
                }
            };
        });


        vm.onUploadDone = function(file,response){//handle the after upload shit
            if (!vm.Page.thumb){
                vm.Page.thumb = thumb;
            }

            vm.Page.thumb = response;
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
        };

    }


})();