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
        vm.Page = {
            active: false,
            categories: [],
            thumb: {},
            mediaFiles: {
                images: [],
                documents: [],
                videos: []
            },
            related: [],
            settings: {}
        };

        var modulesToWaitFor = [
                'mediaFiles'
            ],
            modulesLoaded = 0;

        $rootScope.$on('module.loaded', function(e,module) {
            //do your will
            if (modulesToWaitFor.indexOf(module) != -1){
                modulesLoaded++;
            }

            if (modulesLoaded == modulesToWaitFor.length){
                allDone();
            }
        });

        function allDone(){
            if ($routeParams.id != 'new'){
                Page.get($routeParams.id).then(function(page){

                    $rootScope.$broadcast('page.loaded',page);

                    vm.Page = page;

                });
            } else {//new product
                $rootScope.$broadcast('page.loaded',vm.Page);
            }
        }



        $rootScope.$on('file.upload.progress',function(e,file,progress){//monitor file progress

        });

        $rootScope.$on('file.upload.added',function(e,files){//new files added
            //$rootScope.$broadcast('file.upload.startUpload',files);//could be bound on a button
        });

        vm.changeState = function(state){
            console.log(state)
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