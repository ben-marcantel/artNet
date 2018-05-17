"use strict";

angular.module("ArtNet").controller("ResultsCtrl", function($scope, $q, AuthFactory, NeuralNetFactory, LsystemFactory,$location){
        let chanceOfLike;
        let testObjData;

        $scope.reset= ()=>{
          let zoomAmt= 0;
          $scope.zoomAmt = 0;
          LsystemFactory.resetImage();    
          LsystemFactory.zoomImage(zoomAmt);
        }; 

      const resetItAll = ()=>{
            
            NeuralNetFactory.resetArrayLength();
            LsystemFactory.resetObject();
            LsystemFactory.setInitValues();
            LsystemFactory.defineObjectToTest();
            testObjData = LsystemFactory.sendTrainObject();
            showIt();
      };



        let showIt = ()=> {
          console.log("im here!");
          chanceOfLike = NeuralNetFactory.fate(testObjData);
          $scope.percentage=chanceOfLike.like*100;
          // if (chanceOfLike.like>1/10){

            LsystemFactory.drawResult();

          // } else if (chanceOfLike<1/20){
          //   console.log("broke it");
            // resetItAll();
          // }
          
        };

        const testData = ()=>{ 
            LsystemFactory.setInitValues();
            LsystemFactory.defineObjectToTest();
            testObjData = LsystemFactory.sendTrainObject();
        };
       

        const getData = ()=>{
            testData();
            showIt();  
        };

        $scope.testButton = ()=>{
          resetItAll();
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
            let   zoomAmt= $scope.zoomAmt;            
            LsystemFactory.getColorValue(colorValue,zoomAmt);
        };
 

        $scope.toTrainPage =()=>{
           $location.url(`/train`); 
        };

        LsystemFactory.resetCanvasOnLoad();
        initColor(); 
        NeuralNetFactory.resetArrayLength();
        NeuralNetFactory.divinationRod()
        .then(()=>{
            $scope.length = NeuralNetFactory.getArrayLength();
            getData();
        });
});