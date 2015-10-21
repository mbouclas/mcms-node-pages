(function() {
    angular.module('mcms.pages.page')
        .directive('mediaFiles', mediaFiles);

    mediaFiles.$inject = ['pagesConfig'];
    mediaFilesController.$inject = ['pages.pageService','$scope','$rootScope'
        ,'pagesConfig','$timeout','configuration','lodashFactory'];


    function mediaFiles(Config) {

        return {
            templateUrl: Config.appUrl + "Components/editItem/mediaFiles.directive.html",
            controller: mediaFilesController,
            require: ['^editPage'],
            scope: {},
            restrict : 'E',
            link : mediaFilesLink,
            controllerAs: 'VM'
        };

    }

    function mediaFilesLink(scope, elem, attrs, editPageController){

    }

    function mediaFilesController(Page,$scope,$rootScope,Config,$timeout,BaseConfig,lo){
        var vm = this;
        $rootScope.$broadcast('module.loaded','mediaFiles');

        $rootScope.$on('page.loaded',function(event,page){
            vm.Page = page;
            vm.uploadConfig = {
                url : Config.apiUrl + 'uploadThumb',
                fields : {
                    id : page._id
                }
            };

            vm.uploadConfigMulti = {
                url : Config.apiUrl + 'uploadImage',
                fields : {
                    id : page._id
                }
            };
        });

        vm.sortableOptions = {
            containment: '#sortable-container',
            orderChanged: function(event) {
                recalculateOrderBy(vm.Page.mediaFiles.images);
            }
        };

        vm.onUploadDone = function(file,response){//handle the after upload shit
            if (!vm.Page.thumb){
                vm.Page.thumb = thumb;
            }

            vm.Page.thumb = response;
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


        vm.onUploadMultiDone = function(file,response){//handle the after upload shit
            if (!vm.Page.mediaFiles){
                vm.Page.mediaFiles = mediaFiles;
            }
            vm.Page.mediaFiles.images.push(lo.merge({id : response.id},response.copies));
        };

    }

    function recalculateOrderBy(arr){
        angular.forEach(arr,function(item,i){
            item.orderBy = i;
        });
    }


})();