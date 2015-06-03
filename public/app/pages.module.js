(function(){
    'use strict';

    angular.module('mcms.pages', [
        'ngRoute',
        'mcms.core'
    ])
        .config(pagesConfig);

    pagesConfig.$inject = ['$routeProvider','configuration'];

    function pagesConfig($routeProvider,configuration) {
        $routeProvider
            .when('/pages', {
                templateUrl: configuration.appUrl + 'index.html',
                controller: 'pagesCtrl',
                controllerAs: 'Pages'
            });
    }
})();

