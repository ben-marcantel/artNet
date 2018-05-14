"use strict";

angular.module("ArtNet").controller("TrainCtrl", function($scope, $route, AuthFactory, NeuralNetFactory, LsystemFactory, $location){

  let currentUser;
  // if (currentUserId === null){
  //   $location.path("/");
  // } else 

    const initColor =()=>{
      $scope.colorAmt="#00FFFF";
      let colorValue= $scope.colorAmt;
      LsystemFactory.getColorValue(colorValue);
    };

        $scope.dislike=()=>{
          LsystemFactory.dislike();
          let dislikeData = LsystemFactory.sendTrainObject();
          console.log(dislikeData);
          NeuralNetFactory.sendDislikeData(dislikeData);  
        };

        $scope.like=()=>{
          LsystemFactory.like();
          let likeData = LsystemFactory.sendTrainObject();
          console.log(likeData);
          NeuralNetFactory.sendLikeData(likeData);
        };

      $scope.zoom = ()=>{
          let zoomAmt= $scope.zoomAmt;
          LsystemFactory.zoomImage(zoomAmt);
      };
      
      $scope.colorSet =()=>{
          let colorValue= $scope.colorAmt;
          LsystemFactory.getColorValue(colorValue);
      };

      $scope.reset= ()=>{
        let zoomAmt= 0;
        LsystemFactory.resetImage();    
        LsystemFactory.zoomImage(zoomAmt);
      };      

      $scope.loadTrainingSessions = ()=>{
        NeuralNetFactory.getTrainSessions()
        .then((sessions) => {
            $scope.sets = sessions; 
        })
        .catch((error) => {
            console.log("You messed up bruh", error);
        });
    };
    $scope.saveNewSession=()=>{
      let name =  $scope.trainName;
      NeuralNetFactory.createTrainSession(name);
    };


    $scope.deleteSet = (sessionId)=>{
        NeuralNetFactory.deleteTrainSession(sessionId)
        .then(()=>{
            $scope.loadTrainingSessions();
        });
    };

    $scope.exitTraining = ()=>{
        $route.reload("/train");
    };
   

    AuthFactory.getCurrentUser();
    console.log("hey",currentUser);
    initColor();
    LsystemFactory.onLoadImage();
});