"use strict";

angular.module("ArtNet").controller("TrainCtrl", function($scope, $route, AuthFactory, $timeout, NeuralNetFactory, LsystemFactory, HomeAnimationFactory, $location){
        let currentSessionId;
        let currentUser;
        let name;
        let justSaved;
        let sessionArray;
        let currentSessionIdName;
        let voteTally={};

////////PROMPT MESSAGES
        $scope.prompt = "For each image please select the choice that matches your category";

        const createSessionPrompt = ()=>{
            $scope.prompt = "Please create a new session";
            //set styling of input box to pink for alert
        };

        const createSessionPromptLoad = ()=>{
            $scope.prompt = "Please load a or create a session";
            //set styling of input box to pink for alert
        };

        const createSessionPromptOk = ()=>{
            $scope.prompt = "For each image please select the choice that matches your category";
            //set styling of input box to pink for alert
        };

        const createSessionPromptSaved = ()=>{
            $scope.prompt = " *!DATA SAVED!* ";
            //set styling of input box to pink for alert
        };

////////IMAGE CONTROLS

        const onloadImageLaunch=()=>{
            LsystemFactory.onLoadImage();        
        };

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
            LsystemFactory.getColorValue(colorValue,zoomAmt);
        };

        $scope.reset= ()=>{
            let zoomAmt= 0;
            $scope.zoomAmt = 0;
            LsystemFactory.resetImage();    
            LsystemFactory.zoomImage(zoomAmt);
        };      

////////DATA CONTROLS    
        const updateYesNo = ()=>{
            voteTally = NeuralNetFactory.votes(currentSessionId); 
            $timeout(()=>{
            $scope.yes = voteTally.yes;
            $scope.no = voteTally.no;
            },100); 
        };   

        $scope.dislike=()=>{
            if (!currentSessionId){
                createSessionPromptLoad();   
            } else 
                LsystemFactory.dislike();
                let dislikeData = LsystemFactory.sendTrainObject();
                NeuralNetFactory.sendDislikeData(dislikeData,currentSessionId);  
                createSessionPromptSaved();
                updateYesNo();
        };

        $scope.like=()=>{
            if (!currentSessionId){
                return createSessionPromptLoad();        
            } else 
                LsystemFactory.like();
                let likeData = LsystemFactory.sendTrainObject();
                NeuralNetFactory.sendLikeData(likeData,currentSessionId);
                createSessionPromptSaved();
                updateYesNo();
        };

////////SESSION CONTROLS

        const loadSavedSession =(sessions)=>{
            $scope.sets = sessions; 
            sessionArray= sessions;
            justSaved = sessions.length-1;
        }; 

        const loadTrainingSessions = ()=>{
             NeuralNetFactory.getTrainSessions()
            .then((sessions) => {
                loadSavedSession(sessions);                                
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
                $scope.prompt= "! You must make choose a session  to delete !";   
            } else 
            NeuralNetFactory.deleteTrainSession(currentSessionId)
            .then(()=>{
                $scope.prompt= "! Session Deleted !";
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
            updateYesNo();
        };

        $scope.exitTraining = ()=>{
            // $scope.setCurrentId(null);
            $route.reload("/train");
        };
   
        $scope.saveNewSession=()=>{
            name =  $scope.trainName;
            if(!name){
                $scope.prompt = "Please enter a name for your session to save it";
            } else if(name){
                $scope.prompt = "! New Session Saved !";
                NeuralNetFactory.createTrainSession(name)
                .then(()=>{
                    currentSessionId=null;
                    loadTrainingSessions();
                    $timeout(()=>{
                        $scope.sessionName =sessionArray[+justSaved].name;
                        currentSessionId =sessionArray[+justSaved];
                    },100); 
                }); 
            }               
        };

////////ON LOAD FUNCTIONS 
            LsystemFactory.endAnimate();
            HomeAnimationFactory.endAnimate();
            LsystemFactory.resetCanvasOnLoad();
            initColor();
            loadTrainingSessions();
            onloadImageLaunch();

});