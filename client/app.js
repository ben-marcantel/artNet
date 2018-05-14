"use strict";

angular.module("ArtNet", ["ngRoute"]).config($routeProvider=>{
    $routeProvider
    .when("/",{
        templateUrl: "partials/home.html",
        controller: "HomeCtrl"
    }).when("/train",{
        templateUrl: "partials/train.html",
        controller: "TrainCtrl"
    }).when("/results",{
        templateUrl: "partials/results.html",
        controller: "ResultsCtrl"
    })
    .otherwise("/");
});



angular.module("ArtNet").run(($rootScope, $location, $route, $window, AuthFactory)=>{
    $rootScope.$on("$routeChangeStart", function(event, next, current){
       AuthFactory.setUserStatus().then(()=>{
           console.log("user", AuthFactory.getCurrentUser());
           console.log("next", next);
           AuthFactory.broadcastUserLogin(AuthFactory.getCurrentUser());
       });
    });
});