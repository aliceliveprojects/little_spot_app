(function () {
    'use strict';

    angular
        .module('authenticatejs')
        .controller('authenticateIntroCtrl', control);

    control.$inject = [
        '$timeout',
        '$state',
        'authenticateSrvc'
    ];

    function control(
        $timeout,
        $state,
        authenticateSrvc

    ) {
        var vm = angular.extend(this, {

        });


        function update() {
            vm.isLoggedIn = authenticateSrvc.isAuthenticated();
        }

        vm.login = function () {
            // wrapped in timeout, because use of Promises in authenticationSrvc causes 
            // 'somthing' to call vm.login twice on a single button click. (digest prob?)
            $timeout(
                function () {
                    authenticateSrvc.authenticate().then(
                        update,
                        update

                    );
                });
        }

        vm.logout = function () {
            authenticateSrvc.clear();
            update();
        }

        vm.goBack = function () {
            $state.go('list');
        }

        update();


    }
})();
