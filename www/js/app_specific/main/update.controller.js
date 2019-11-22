(function () {
    'use strict';

    angular
        .module('mainjs')
        .controller('updateCtrl', control);

    control.$inject = [
        '$state',
        '$stateParams',
        'mainSrvc'
    ];

    function control(
        $state,
        $stateParams,
        mainSrvc
    ) {


        function onError(error) {

            alert("Sorry, we got an error: " + error.message);
            $state.go('list');

        }


        var term = $stateParams.term;
        var itemId = $stateParams.itemId;


        if (!!term) {
            mainSrvc.queryTerm(term)
                .then(
                    function () { $state.go('list') }
                )
                .catch(onError);
        } else if (!!itemId) {
            mainSrvc.fetchItem(itemId)
                .then(
                    function () { $state.go('detail') }
                )
                .catch(onError);
        } else {
            $state.go('list');
        }
    }


})();
