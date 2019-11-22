(function () {
    'use strict';

    angular
        .module('mainjs')
        .controller('listCtrl', control);

    control.$inject = [
        '$state',
        'mainSrvc',
        'authenticateSrvc'
    ];

    function control(
        $state,
        mainSrvc,
        authenticateSrvc
    ) {



        var vm = angular.extend(this, {
            items: [],
            term: ""
        });



        vm.onItemSelected = function (index) {
            var selectedItem = vm.items[index];

            vm.itemUpdate(selectedItem);
        }

        vm.noItems = function () {
            var result = true;
            try{
                result = vm.items.length == 0;
            }catch(e){}
            return result;
        }



        vm.termUpdate = function (term) {

            if (authenticateSrvc.getAuthInfo() == null) {
                alert("Press 'Authenticate'.");
            } else {
                $state.go('update', { term: term });
            }
        }

        vm.itemUpdate = function (item) {

            if (authenticateSrvc.getAuthInfo() == null) {
                alert("Press 'Authenticate'.");
            } else {
                $state.go('update', { itemId: item.id });
            }
        }



        vm.authenticate = function () {
            $state.go('authenticate_intro');
        }

        vm.term = mainSrvc.getTerm();
        vm.items = mainSrvc.getItems();

    }
})();
