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