"use strict";

//ChatApp module
var ChatApp = angular.module("ChatApp",["ngResource","ui.router","LocalStorageModule",
	"pascalprecht.translate", "angular-loading-bar"]);

ChatApp.config(["localStorageServiceProvider",
	function(localStorageServiceProvider) {
		localStorageServiceProvider.setPrefix("ChatApp");
	}]);


ChatApp.config(['$translateProvider', function ($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		files: [{
			prefix: '/public/languages/',
			suffix: '.json'
		}]
	});
	$translateProvider.preferredLanguage('en');
	$translateProvider.fallbackLanguage('en');
}]);

ChatApp.config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.spinnerTemplate = '<div id="pluswrap">\
	<div class="plus">\
	<img src="/public/images/loader.gif">\
	</div>\
	</div>';

}])

ChatApp.run(["$rootScope", "AuthenticationManager","$state",
	function($rootScope, AuthenticationManager, $state,editableOptions) {
		//
		$rootScope.globals = {
			heartBeatConfig : {
				url : "/api/heartbeat",
				method: "POST",
				data : {
					username : null
				},
				interval: 60000
			}
		};

		if(AuthenticationManager.isAuthenticated()) {
			$rootScope.globals.isAuthenticated = true;

			$rootScope.globals.authenticatedUser = AuthenticationManager.authenticatedUser();
			$rootScope.globals.heartBeatConfig.data.username =  AuthenticationManager.authenticatedUser().username;
		} else {
			$rootScope.globals.isAuthenticated = false;

			$rootScope.globals.authenticatedUser = null;
			$rootScope.globals.heartBeatConfig.data.username =  null;
		}

		$rootScope.$on("$authSuccess", function(event, data) {
			$rootScope.globals.isAuthenticated = true;

			$rootScope.globals.authenticatedUser = data.authenticatedUser;
			$rootScope.globals.heartBeatConfig.data.username =  AuthenticationManager.authenticatedUser().username;
		});

		$rootScope.$on("$authCleared", function() {
			$rootScope.globals.isAuthenticated = false;

			$rootScope.globals.authenticatedUser = null;
			$rootScope.globals.heartBeatConfig.data.user =  null;
		});

		$rootScope.$on("$stateChangeStart",
			function(event, toState, todata, fromState, fromdata) {
				
				//$rootScope.globals.showLoader = true;

				if(toState.data.isSecure) {
					if(!$rootScope.globals.isAuthenticated) {
						event.preventDefault();
						$state.go("home page");
					}
				}

				if((toState.name === "home page" || toState.name === "signup page") && $rootScope.globals.isAuthenticated) {
					event.preventDefault();
					$state.go("chat page");
				}
			});

		$rootScope.$on("$stateChangeSuccess",
			function(event) {
				//$rootScope.globals.showLoader = false;
			});

	}]);




