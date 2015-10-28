"use strict";

angular.module("ChatApp").factory("User", ["$resource", function($resource) {
	return $resource("/api/users/:username", {username : "@username"});
}]);
