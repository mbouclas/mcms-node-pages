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
