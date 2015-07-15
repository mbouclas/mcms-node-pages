(function(){
    'use strict';

    angular.module('mcms.pages', [
        'ngRoute',
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
                name : 'edit-page'
            });
    }

    function pagesRun(pageService,$rootScope,$location,$route){
        $rootScope.$on('$routeChangeStart', function(e, next, current) {
            if (!pageService.loaded){
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
    var core = angular.module('mcms.pages');
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

    core.value('pagesConfig', config);
    core.constant('pagesConfiguration',config);
})();

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
(function(){
    angular.module('mcms.pages')
        .controller('editPageCtrl',editPageCtrl);

    editPageCtrl.$inject = ['$rootScope','logger','pageTitle','pages.pageService','$timeout'];

    function editPageCtrl($rootScope,logger,pageTitle,pageService,$timeout){
        var vm = this;


        $rootScope.$on('page.loaded',function(e,page){
            pageTitle.set({
                pageTitle : page.title,
                path : [
                    {
                        href : 'admin/pages',
                        title : 'Pages'
                    }
                ]
            });
        });

        pageTitle.set('Pages');

    }


})();