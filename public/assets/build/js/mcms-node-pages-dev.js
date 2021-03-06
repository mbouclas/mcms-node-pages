(function(){
    'use strict';

    angular.module('mcms.pages', [
        'mcms.pages.configuration',
        'mcms.pages.categories',
        'mcms.pages.page'
    ])
        .config(pagesConfig)
        .run(pagesRun);

    pagesConfig.$inject = ['$routeProvider','pagesConfiguration'];
    pagesRun.$inject = ['pages.pageService','$rootScope','$location','$route'];


    function pagesConfig($routeProvider,configuration) {
        $routeProvider
            .when('/pages', {
                templateUrl: configuration.appUrl + 'index.html',
                controller: 'pagesCtrl',
                controllerAs: 'VM',
                name : 'pages-home'
            })
            .when('/pages/edit/:id', {
                templateUrl: configuration.appUrl + 'Pages/editPage.html',
                controller: 'editPageCtrl',
                controllerAs: 'VM',
                name : 'edit-page',
                reloadOnSearch : false
            });
    }

    function pagesRun(pageService,$rootScope,$location,$route){
        $rootScope.$on('$routeChangeStart', function(e, next, current) {
            if (!pageService.loaded && !pageService.loading){
                e.preventDefault();//pause until init
                pageService.init().then(function(res){
                    $route.reload();//reload the route
                });
            }
        });

    }
})();


(function(){
    'use strict';

    var assetsUrl = '/assets/',
        appUrl = '/pages.app/',
        componentsUrl = appUrl + 'components/';
    var config = {
        apiUrl : '/admin/api/pages/',
        imageBasePath: assetsUrl + 'img',
        appUrl : appUrl,
        componentsUrl : componentsUrl,
        menu : [],
        redactor : {
            wym : true,
            observeLinks : true,
            convertUrlLinks : true,
            plugins : ['fullscreen','fontsize','fontfamily','video','fontcolor'],
            removeEmpty : ['strong','em','p','span']
            //buttons : ['formatting', '|', 'bold', 'italic']
        }
    };

/*    core.value('pagesConfig', config);
    core.constant('pagesConfiguration',config);*/

    angular.module('mcms.pages.configuration',[])
        .constant('pagesConfiguration',config)
        .value('pagesConfig',config);
})();

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
(function(){
    'use strict';

    angular.module('mcms.pages.categories',[]);
})();
(function(){
    'use strict';

    angular.module('mcms.pages.page',[

    ]);
})();
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
            this.loading = true;
            return dataService.init().then(function(res){
                PageService.Categories = res.categories;
                for (var i in PageService.Categories){
                    PageService.CategoriesById[PageService.Categories[i].id] = PageService.Categories[i];
                }

                $rootScope.$broadcast('pages.init.done');
                $rootScope.pagesAppDone = true;
                _this.loaded = true;
                _this.loading = false;
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



    }


})();
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

(function(){
    angular.module('mcms.pages')
        .controller('editPageCtrl',editPageCtrl);

    editPageCtrl.$inject = ['$rootScope','logger','pageTitle'];

    function editPageCtrl($rootScope,logger,pageTitle){
        var vm = this;


        $rootScope.$on('page.loaded',function(e,page){

            pageTitle.set({
                pageTitle : page.title,
                path : [
                    {
                        href : 'pages',
                        title : 'Pages'
                    }
                ]
            });
        });

        pageTitle.set('Pages');
    }


})();