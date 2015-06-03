(function(){
    angular.module('mcms.pages')
        .controller('pagesCtrl',pagesCtrl);

    pagesCtrl.$inject = ['$rootScope','logger','momentFactory','pageTitle'];

    function pagesCtrl($rootScope,logger,moment,pageTitle){
        var vm = this;

        pageTitle.set('Pages');
    }


})();