"use strict";

angular.module("ChatApp").directive("chatEnter", function() {
	return {
		restrict : "A",
		link : function(scope, element, attrs) {
			element.keypress(function(event) {
				//enter key
				if(event.keyCode === 13) {
					scope.$apply(attrs.chatEnter);
				}
			});
		}
	}
});

angular.module("ChatApp").directive("chatHeartBeat", [ "$interval", "$http", function($interval, $http) {
	function beat(config) {
		$http(config).then(
			function(result){
				console.log(result);
			},
			function(error){
				console.log(error);
			});
	};

	return {
		restrict : "AE",
		scope : {
			config: "=config"
		},
		link : function(scope, element,attrs) {
			//invoke right away
			//if user keeps refreshing page
			beat(scope.config);

			var timer = $interval(beat, scope.config.interval,0,false,scope.config);

			element.on("$destroy", function() {
				$interval.cancel(timer);
			});
		}
	}
}]);