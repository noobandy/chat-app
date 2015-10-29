"use strict";

angular.module("ChatApp").factory("User", ["$resource", function($resource) {
	return $resource("/api/users/:username", {username : "@username"}, {
		create : {
			method :"POST",
			url : "/api/users"
		},
		update : {
			method : "PUT"
		},
		onlineUsers : {
			method: "GET",
			url: "/api/onlineusers",
			isArray : true
		}
	});
}]);
