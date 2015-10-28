"use strict";

angular.module("ChatApp").config(["$stateProvider", "$urlRouterProvider", 
  function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home page', {
      url: "/",
      templateUrl: "/public/templates/home.html",
      controller : "HomeController",
      data : {
        isSecure : false
      }
    }).state('chat page', {
      url: "/chat",
      templateUrl: "/public/templates/chat.html",
      controller: "ChatController",
      data : {
        isSecure : true
      }
    }).state("something went wrong", {
      url : "/500",
      templateUrl: "/public/templates/500.html",
      data: {
        isSecure : false
      }
    }).state("not found", {
      url : "/404",
      templateUrl: "/public/templates/404.html",
      data: {
        isSecure : false
      }
    }).state("about page", {
      url: "/about",
      templateUrl : "/public/templates/about.html",
      data : {
        isSecure : false
      }
    });
}]);