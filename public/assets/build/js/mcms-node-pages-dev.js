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


(function(){
    'use strict';

    var core = angular.module('mcms.pages');
    var assetsUrl = '/assets/',
        appUrl = '/app/',
        componentsUrl = appUrl + 'components/';
    var config = {
        imageBasePath: assetsUrl + 'img',
        appUrl : appUrl,
        componentsUrl : componentsUrl
    };

    core.value('config', config);
    core.constant('configuration',config);
})();

(function(){
    angular.module('mcms.pages')
        .controller('pagesCtrl',pagesCtrl);

    pagesCtrl.$inject = ['$rootScope','logger','momentFactory','pageTitle'];

    function pagesCtrl($rootScope,logger,moment,pageTitle){
        var vm = this;

        pageTitle.set('Pages');
    }


})();