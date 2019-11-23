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
           
            
            redirectShort: "http://localhost/callback",
            redirectUri: "http://localhost/callback.html",
            scopes: "streaming",
            authServiceUri: "https://accounts.spotify.com/authorize",
            
            // you'll need to deploy a server which contacts Spotify to exchange a primary token, obtained from authServiceUri
            // using your Spotify developer account's CLIENT SECRET
            // you can find source code here:
            // https://github.com/aliceliveprojects/little_spot_authentication_server
            // ONCE YOU HAVE ADDED THESE VALUES, DO NOT CHECK THIS FILE IN.
            exchangeServiceUri: 'YOUR TOKEN EXCHANGE URL HERE',
            clientId: 'YOUR SPOTIFY CLIENT ID HERE'
        };


        return service;

    }

    
})();
