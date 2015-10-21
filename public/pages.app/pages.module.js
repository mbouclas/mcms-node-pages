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

