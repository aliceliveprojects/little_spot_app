(function () {
    'use strict';

    angular
        .module('authenticatejs')
        .factory('credentialsSrvc', credentialsSrvc);

        credentialsSrvc.$inject = [

        ];

    function credentialsSrvc(
 
    ) {

        var service = {
           
            clientId: '8c1a070c8624472f99201cf8bf8847c6',
            redirectShort: "http://localhost/callback",
            redirectUri: "http://localhost/callback.html",
            scopes: "streaming, user-read-playback-state",
            authServiceUri: "https://accounts.spotify.com/authorize",
            exchangeServiceUri: "https://alice-spotify-auth.herokuapp.com:443/spotify/exchange"
            
        };


        return service;

    }

    
})();