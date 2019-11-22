// uses https://www.thepolyglotdeveloper.com/2014/07/using-oauth-2-0-service-ionicframework/
// abd https://www.thepolyglotdeveloper.com/2014/07/launch-external-urls-ionicframework/
// with many thanks!
(function() {
	'use strict';

	angular
		.module('authenticatejs', [
		])
        .config(function($stateProvider) {
			$stateProvider
				.state('authenticate_intro', {
					cache: false,
					url: '/authenticate_intro',
					templateUrl: 'js/app_specific/authenticate/authenticate.intro.html',
                    controller: 'authenticateIntroCtrl as vm'
				}),
			$stateProvider
				.state('authenticate_secure', {
					cache: false,
					url: '/authenticate_secure',
					templateUrl: 'js/app_specific/authenticate/authenticate.secure.html',
                    controller: 'authenticateSecureCtrl as vm'
                })

            });
				
})();