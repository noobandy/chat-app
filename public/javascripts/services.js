"use strict";

angular.module("ChatApp").service("AuthenticationManager", [ "User", 
	"localStorageService","$rootScope",
	function(User, localStorageService, $rootScope) {
		return {
			authenticate : function(username, success, error) {
				var user = User.get({username : username}, function(result) {
					localStorageService.set("authenticatedUser", user);
					//only interested in $rootScope.$on()
					$rootScope.$emit("$authSuccess", {authenticatedUser : user});
					success();
				},function(rejection){
					$rootScope.$emit("$authFailed");
					error();
				});
			},
			signOut : function() {
				localStorageService.clearAll();
				$rootScope.$emit("$authCleared");
			},
			isAuthenticated : function() {
				 
				if(this.authenticatedUser() !== null) {
					return true;
				} else {
					return false;
				}
			},
			authenticatedUser : function() {
				return localStorageService.get("authenticatedUser");
				
			}
		};
	}]);