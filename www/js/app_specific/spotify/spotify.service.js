(function () {
    'use strict';

    angular
        .module('spotifyjs', []) //note: defines its own module, with []
        .factory('spotifySrvc', spotifySrvc);

    spotifySrvc.$inject = [
        '$http'
    ];

    function spotifySrvc(
        $http
    ) {


        var BASE_SEARCH_URI = 'https://api.spotify.com/v1/search?q=';
        var BASE_FETCH_URI = 'https://api.spotify.com/v1/tracks/';

        function unpackQueryResponse(response) {
            var result = [];
            try {


                var items = response.data.tracks.items;

                items.forEach(function (item) {
                    result.push(
                        {
                            name: item.name,
                            artist: item.artists[0].name,
                            id: item.id
                        }
                    );
                });


            } catch (e) {
                // ignore
            }


            return result;

        }

        function unpackFetchResponse(response) {
            var result = response.data;

            return result;

        }

        function queryTerm(token, term, limit = 10, offset = 0) {
            return new Promise(function (resolve, reject) {
                var config = { headers: { 'Authorization': `Bearer ${token}` } };
                var searchString = BASE_SEARCH_URI + 'artist:"' + term + `"&type=track&limit=${limit}&offset=${offset}`;
                $http.get(encodeURI(searchString), config)
                    .then(function (response) {

                        var result = unpackQueryResponse(response);



                        resolve(result);
                    })
                    .catch(function (error) {
                        reject(error)
                    });
            });

        }


        function fetchItem(token, itemId) {
            return new Promise(function (resolve, reject) {
                var config = { headers: { 'Authorization': `Bearer ${token}` } };
                var searchString = BASE_FETCH_URI + `${itemId}`;
                $http.get(encodeURI(searchString), config)
                    .then(function (response) {
                        var result = unpackFetchResponse(response);
                        resolve(result);
                    })
                    .catch(function (error) {
                        reject(error)
                    });
            });
        }


        var service = {
            queryTerm: queryTerm,
            fetchItem: fetchItem
        };


        return service;

    }


})();