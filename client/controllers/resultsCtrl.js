"use strict";

angular.module("ArtNet").controller("ResultsCtrl", function($scope, AuthFactory, NeuralNetFactory, LsystemFactory, $location)        {


        let currentUserId = null;
    
        $scope.$on("handleBroadcast", function(event, user) {
          currentUserId = user.id;
          console.log("Current user", currentUserId);
        });
    
        
  // getLineData()
    // .then((data)=>{
    //     let values = Object.values(data);
    //     values.forEach(value=>{
    //         lineArray.push(value);
    //     })
    // })
    
    // getBlankData()
    // .then((data)=>{
    //     let values = Object.values(data);
    //     values.forEach(value=>{
    //         lineArray.push(value);
    //     })
    // })
});