"use strict";

angular.module("ArtNet").controller("TrainCtrl", function($scope, $route, AuthFactory, $timeout, NeuralNetFactory, LsystemFactory, $location){
        let currentSessionId;
        let currentUser;
        let name;
        let justSaved;
  // if (currentUserId === null){
  //   $location.path("/");
  // } else 
  
        const onloadImageLaunch=()=>{
        LsystemFactory.onLoadImage();        
        };
////////PROMPT MESSAGES
        const createSessionPrompt = ()=>{
            $scope.prompt = "Please create a new session";
            //set styling of input box to pink for alert
        };

        const createSessionPromptLoad = ()=>{
            $scope.prompt = "Please load a or create a session";
            //set styling of input box to pink for alert
        };

        const createSessionPromptOk = ()=>{
          $scope.prompt = "";
          //set styling of input box to pink for alert
        };
        const createSessionPromptSaved = ()=>{
          $scope.prompt = " *!DATA SAVED!* ";
          //set styling of input box to pink for alert
        };

////////IMAGE CONTROLS

        const initColor =()=>{
            $scope.colorAmt="#00FFFF";
            let colorValue= $scope.colorAmt;
            LsystemFactory.getColorValue(colorValue);
        };

        $scope.zoom = ()=>{
            let zoomAmt= $scope.zoomAmt;
            LsystemFactory.zoomImage(zoomAmt);
        };
      
        $scope.colorSet =()=>{
            let colorValue= $scope.colorAmt;
            let zoomAmt= $scope.zoomAmt;        
            console.log(colorValue);    
            LsystemFactory.getColorValue(colorValue,zoomAmt);
        };

        $scope.reset= ()=>{
            let zoomAmt= 0;
            $scope.zoomAmt = 0;
            LsystemFactory.resetImage();    
            LsystemFactory.zoomImage(zoomAmt);
        };      

////////DATA CONTROLS     

        $scope.dislike=()=>{
            if (!currentSessionId){
                createSessionPromptLoad();   
            } else 
                LsystemFactory.dislike();
                let dislikeData = LsystemFactory.sendTrainObject();
                NeuralNetFactory.sendDislikeData(dislikeData,currentSessionId);  
                createSessionPromptSaved();
        };

        $scope.like=()=>{
            if (!currentSessionId){
                return createSessionPromptLoad();        
            } else 
                LsystemFactory.like();
                let likeData = LsystemFactory.sendTrainObject();
                NeuralNetFactory.sendLikeData(likeData,currentSessionId);
                createSessionPromptSaved();
        };

////////SESSION CONTROLS
        const loadTrainingSessions = ()=>{
            NeuralNetFactory.getTrainSessions()
            .then((sessions) => {
                $scope.sets = sessions; 
                justSaved = sessions.length;
                console.log("on load array",justSaved)
                if (!$scope.sets){
                createSessionPrompt();
                }
            })
            .catch((error) => {
                console.log("You messed up bruh", error);
            });
        };

        $scope.goToResults = ()=>{
          if (!currentSessionId){
              return createSessionPromptLoad();   
          } else 
              $location.url(`/results`); 
          };
        
        $scope.deleteSet = ()=>{
            if (!currentSessionId){
                $scope.prompt= "!You must make choose a session  to delete!";   
            } else 
            NeuralNetFactory.deleteTrainSession(currentSessionId)
            .then(()=>{
                $scope.prompt= "!Session Deleted!";
                $scope.sessionName=null;
                currentSessionId=null;                
                loadTrainingSessions();
            });
        };

        $scope.setCurrentId=(sessionData)=>{
            currentSessionId= sessionData.id;
            $scope.sessionName= sessionData.name;
            createSessionPromptOk();
            NeuralNetFactory.setTrainSetId(currentSessionId); 
        };

        $scope.exitTraining = ()=>{
            $route.reload("/train");
        };
   
        $scope.saveNewSession=()=>{
            name =  $scope.trainName;
            if(!name){
                $scope.prompt = "Please enter a name for your session to save it";
            } else if(name){
                $scope.prompt = "!New Session Saved!";
                NeuralNetFactory.createTrainSession(name)
                .then(()=>{
                    currentSessionId=null;
                    loadTrainingSessions();
                    $timeout(()=>{
                        
                        console.log($scope.sets[+justSaved],$scope.sets[5],+justSaved)    
                    },500);
                    
                });
               
                
                

                
            }               
        };

      
   
////////ON LOAD FUNCTIONS 
            LsystemFactory.resetCanvasOnLoad();
            initColor();
            loadTrainingSessions();
            onloadImageLaunch();
});