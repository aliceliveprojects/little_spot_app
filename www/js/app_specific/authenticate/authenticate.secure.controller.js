(function () {
    'use strict';

    angular
        .module('authenticatejs')
        .controller('authenticateSecureCtrl', control);

    control.$inject = [
        '$state',
        '$stateParams'
        ];
    
    function control(
        $state,
        $stateParams
    ) {
        var vm = angular.extend(this, {

         });
        

        vm.done = function(){
            $state.go('list');
        }


    }
})();
