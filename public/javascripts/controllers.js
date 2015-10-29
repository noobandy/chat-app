"use strict";

angular.module("ChatApp").controller("NavbarController", ["$rootScope",
	"AuthenticationManager", "$state","$scope", "$translate",
	function($rootScope, AuthenticationManager, $state, $scope, $translate) {
		$scope.signOut = function() {
			AuthenticationManager.signOut();
			$state.go("home page");
		}

		$scope.changeLanguage = function(locale) {
			$translate.use(locale);
		}
	}]);

angular.module("ChatApp").controller("HomeController", ["$scope","User",
	"$state","AuthenticationManager", 
	function($scope, User, $state, AuthenticationManager) {

		$scope.loginModel = { username : "", wrongCredentials : false, failedCount : 0};

		$scope.signIn = function(loginModel) {

			AuthenticationManager.authenticate(loginModel.username, function() {
				$state.go("chat page");
			}, function() {
				loginModel.failedCount = loginModel.failedCount + 1;
				loginModel.wrongCredentials = true;
			});
		}
	}]);

angular.module("ChatApp").controller("SignUpController", ["$scope","User",
	"$state", "AuthenticationManager",
	function($scope, User, $state, AuthenticationManager) {

		$scope.signUpModel = { username : "", usernameTaken : false};

		$scope.userExists = function(username) {
			User.get({username : username}, function() {
				$scope.signUpModel.usernameTaken = true;
			}, function(){
				$scope.signUpModel.usernameTaken = false;
			});
		};

		$scope.signUp = function(signUpModel) {
			var user = new User();
			user.username = signUpModel.username;
			var user = user.$create({},function(result){
				AuthenticationManager.authenticate($scope.signUpModel.username, function() {
					$state.go("chat page");
				});
			});
		};
	}]);

angular.module("ChatApp").controller("ChatController", ["$rootScope", "$scope",
	"User",
	function($rootScope, $scope, User) {
		$scope.onlineUsers = User.onlineUsers();


		$scope.openChatWindows = [{
			newMessage : "",
			title : "Anand Mohan",
			minimized : false,
			messages : [ {
				message : "that mongodb thing looks good, huh? tiny master db, and huge document store",
				time : new Date(),
				sender: {
					username : "Anand Mohan",
					avatar : "http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg"
				}
			},{
				message : "that mongodb thing looks good, huh? tiny master db, and huge document store",
				time : new Date(),
				sender: {
					username : "Bret",
					avatar : "http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg"
				}
			}]
		}];


		$scope.newChat = function(user) {
			$scope.openChatWindows.push({
				title : user.username,
				messages : []
			})
		};

		$scope.toggleChatWindow = function(chatWindow) {
			chatWindow.minimized = !chatWindow.minimized;
		};

		$scope.closeChatWindow = function(chatWindow) {
			var index = $scope.openChatWindows.indexOf(chatWindow);
			$scope.openChatWindows.splice(index, 1);
		};

		$scope.postMessage = function(chatWindow) {
			chatWindow.messages.push({
				message : chatWindow.newMessage,
				time : new Date(),
				sender : {
					username : $rootScope.globals.authenticatedUser.username,
					avatar : "http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg"
				}
			});

			chatWindow.newMessage = "";
		}

	}]);
