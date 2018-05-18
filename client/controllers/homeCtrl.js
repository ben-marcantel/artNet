"use strict";

angular.module("ArtNet").controller("HomeCtrl", function($scope, AuthFactory, $location, HomeAnimationFactory)        {


        let currentUserId = null;
    
        $scope.$on("handleBroadcast", function(event, user) {
          currentUserId = user.id;
        });
        
    
        HomeAnimationFactory.animate();

});