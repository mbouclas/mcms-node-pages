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