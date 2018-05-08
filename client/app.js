"use strict";

angular.module("ArtNet", ["ngRoute"]).config($routeProvider=>{
    $routeProvider.when("/",{
        templateUrl: "partials/auth-form.html",
        controller: "AuthCtrl"
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