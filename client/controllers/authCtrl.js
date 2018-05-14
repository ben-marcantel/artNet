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
            $location.path("/train");
        });
    };
    $scope.login =()=>{
        AuthFactory.logInUser($scope.account)
        .then((user)=>{
            AuthFactory.broadcastUserLogin(user);
            //route to redirect to.
            $location.path("/train");
        });
    };
    $scope.logout= ()=>{
        AuthFactory.logOutUser($scope.account)
        .then((user)=>{
            AuthFactory.broadcastUserLogin(user);
            //route to redirect to.
            $location.path("/");
        });
    };

    $scope.goToTrain = ()=>{
        $location.path("/train");
        
    };
});