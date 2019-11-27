(function () {
    'use strict';

    angular
        .module('spotifyjs', []) //note: defines its own module, with []
        .factory('spotifySrvc', spotifySrvc);

    spotifySrvc.$inject = [
        '$http',
        'authenticateSrvc'
    ];

    function spotifySrvc(
        $http,
        authenticateSrvc
    ) {


        var BASE_SEARCH_URI = 'https://api.spotify.com/v1/search?q=';
        var BASE_FETCH_URI = 'https://api.spotify.com/v1/tracks/';
        var BASE_PLAY_URI = 'https://api.spotify.com/v1/me/player/play?device_id=';
        var BASE_PAUSE_URI = 'https://api.spotify.com/v1/me/player/pause?device_id=';
        var BASE_DEVICES_URI = 'https://api.spotify.com/v1/me/player/devices';

        function unpackQueryResponse(response) {
            var result = [];
            try {


                var items = response.data.tracks.items;

                items.forEach(function (item) {
                    result.push(
                        {
                            name: item.name,
                            artist: item.artists[0].name,
                            id: item.id,
                            uri: item.uri
                        }
                    );
                });


            } catch (e) {
                // ignore
            }


            return result;

        }

        function unpackTrackResponse(response) {
            var result = response.data;

            return result;

        }

        function unpackDeviceResponse(response) {
            var result = [];
            try {


                var items = response.data.devices;

                items.forEach(function (item) {
                    result.push(
                        {
                            name: item.name,
                            type: item.type,
                            id: item.id
                        }
                    );
                });


            } catch (e) {
                // ignore
            }


            return result;

        }


        function unpackPlayResponse(response) {
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

        // https://developer.spotify.com/console/get-users-available-devices/
        function fetchDevices(token) {
            return new Promise(function (resolve, reject) {
                var config = { headers: { 'Authorization': `Bearer ${token}` } };
                var searchString = BASE_DEVICES_URI;
                $http.get(encodeURI(searchString), config)
                    .then(function (response) {
                        var result = unpackDeviceResponse(response);
                        resolve(result);
                    })
                    .catch(function (error) {
                        reject(error)
                    });
            });
        }

        function fetchTrack(token, itemId) {
            return new Promise(function (resolve, reject) {
                var config = { headers: { 'Authorization': `Bearer ${token}` } };
                var searchString = BASE_FETCH_URI + `${itemId}`;
                $http.get(encodeURI(searchString), config)
                    .then(function (response) {
                        var result = unpackTrackResponse(response);
                        resolve(result);
                    })
                    .catch(function (error) {
                        reject(error)
                    });
            });
        }

        function playItem(token, deviceId, itemUri) {
            return new Promise(
                function (resolve, reject) {
                    var config = { headers: { 'Authorization': `Bearer ${token}` } };
                    
                    var searchString = BASE_PLAY_URI + `${deviceId}`;
                    var data = {
                        uris: [itemUri]
                    }
                    $http.put(encodeURI(searchString), data, config)
                        .then(function (response) {
                            var result = unpackPlayResponse(response);
                            resolve(result);
                        })
                        .catch(function (error) {
                            reject(error)
                        });
                }
            );
        }

        function pauseItem(token, deviceId, ) {
            return new Promise(
                function (resolve, reject) {
                    var config = { headers: { 'Authorization': `Bearer ${token}` } };
                 
                    var searchString = BASE_PAUSE_URI + `${deviceId}`;

                    $http.put(encodeURI(searchString), {}, config)
                        .then(function (response) {
                            var result = unpackPlayResponse(response);
                            resolve(result);
                        })
                        .catch(function (error) {
                            reject(error)
                        });
                }
            );
        }

        var PLAYING_ON_DEVICE_ID = null;

        function beginPauseItem(token) {

            return new Promise(function (
                resolve, reject
            ) {
                fetchDevices(token)
                    .then(
                        function (devices) {
                            if (!!PLAYING_ON_DEVICE_ID && PLAYING_ON_DEVICE_ID == devices[0].id) {
                                pauseItem(token, PLAYING_ON_DEVICE_ID)
                                    .then(resolve)
                                    .catch(reject);
                            } else {
                                reject(new Error("Error: Trying to pause something on a different device to that which started playing."));
                            }
                        })
                    .catch(
                        reject
                    );

            });



        }

        function beginPlayItem(token, itemUri) {

            return new Promise(function (
                resolve, reject
            ) {
                fetchDevices(token)
                    .then(
                        function (devices) {
                            PLAYING_ON_DEVICE_ID = devices[0].id;
                            playItem(token, PLAYING_ON_DEVICE_ID, itemUri)
                                .then(resolve)
                                .catch(reject);
                        });

            });



        }


        var service = {
            queryTerm: queryTerm,
            fetchItem: fetchTrack,
            playItem: beginPlayItem,
            pauseItem: beginPauseItem
        };


        return service;

    }


})();