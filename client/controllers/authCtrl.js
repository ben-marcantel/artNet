"use strict";

angular.module("ArtNet").controller("AuthCtrl", function($scope, AuthFactory, $location){
    $scope.account ={};
    $scope.register =()=>{
        $scope.errorMsg ="";
        if($scope.account.password !== $scope.account.passwordConf){
            $scope.errorMsg = "I am afraid I cant let you do that. Those passwords do not match.";
            return null;
        }
        AuthFactory.createUser($scope.account)
        .then(user=>{
            AuthFactory.broadcastUserLogin(user);
            //path to reroute after creating user
            $location.path("/");
        });
    };
    $scope.logIn =()=>{
        // console.log("scope account?",$scope.account);
        AuthFactory.loginUser($scope.account).then((user)=>{
            // console.log("logged in controller !!!", user);
            AuthFactory.broadcastUserLogin(user);
            //route to redirect to.
            $location.path("/");
        });
    };
});