(function () {
    'use strict';

    angular
        .module('mainjs')
        .factory('mainSrvc', mainSrvc);

    mainSrvc.$inject = [
        '$q', // promises service
        '$timeout', // timeout service
        'moment', // does dates really well
        'authenticateSrvc', // holds the auth token
        'spotifySrvc' // does spotify-specific stuff
    ];

    function mainSrvc(
        $q,
        $timeout,
        moment,
        authenticateSrvc,
        spotifySrvc
    ) {



        var _term = "";
        var _items = [];
        var _item = null;

        var service = {

        };


        service.queryTerm = function (term) {
            var token = null;

            try {
                var authInfo = authenticateSrvc.getAuthInfo();
                token = authInfo.access_token;
            } catch (e) {
                // ignore this. Pass null to async function. Allow to fail there.
            }


            return new Promise(function (resolve, reject) {
                spotifySrvc.queryTerm(token, term)
                    .then(
                        function (response) {
                            _items = response;
                            _term = term;
                            _item = null;
                            resolve(_items);
                        })
                    .catch(function (error) {
                        _term = "";
                        _items = []
                        _item = null;
                        reject(error);
                    });
            });
        }


        service.fetchItem = function (itemId) {
            var token = null;

            try {
                var authInfo = authenticateSrvc.getAuthInfo();
                token = authInfo.access_token;
            } catch (e) {
                // ignore this. Pass null to async function. Allow to fail there.
            }


            return new Promise(function (resolve, reject) {
                spotifySrvc.fetchItem(token, itemId)
                    .then(
                        function (response) {
                            _item = response;
                            resolve(_item);
                        })
                    .catch(function (error) {
                        _term = "";
                        _items = []
                        _item = null;
                        reject(error);
                    });
            });
        }


        service.playItem = function(itemUri){
            var token = null;

            try {
                var authInfo = authenticateSrvc.getAuthInfo();
                token = authInfo.access_token;
            } catch (e) {
                // ignore this. Pass null to async function. Allow to fail there.
            }


            return new Promise(function (resolve, reject) {
                spotifySrvc.playItem(token, itemUri)
                    .then(
                        function (response) {
                            resolve(response);
                        })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        }

        service.pauseItem = function(){
            var token = null;

            try {
                var authInfo = authenticateSrvc.getAuthInfo();
                token = authInfo.access_token;
            } catch (e) {
                // ignore this. Pass null to async function. Allow to fail there.
            }


            return new Promise(function (resolve, reject) {
                spotifySrvc.pauseItem(token)
                    .then(
                        function (response) {
                            resolve(response);
                        })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        }



        service.getTerm = function () {
            return _term;
        }
        service.getItems = function () {
            return _items;
        }
        service.getItem = function () {
            return _item;
        }

        return service;

    }


})();