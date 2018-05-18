"use strict";

angular.module("ArtNet").controller("ResultsCtrl", function($scope, $q, AuthFactory, NeuralNetFactory, LsystemFactory,$location, $timeout){
      let chanceOfLike;
      let testObjData;
      let imageRoll
      let counter=0;
      

      const resetItAll = ()=>{
            NeuralNetFactory.resetArrayLength();
            LsystemFactory.resetObject();
            LsystemFactory.setInitValues();
            LsystemFactory.defineObjectToTest();
            testObjData = LsystemFactory.sendTrainObject();
            // $timeout(()=>{
            showIt();
          // },100); 
      };

      $scope.filter = (amt)=>{
        chanceOfLike = amt;
        $scope.amount = amt;
    };

      let showIt = ()=> {
        let present;
            imageRoll = NeuralNetFactory.fate(testObjData);
            present = Math.floor(imageRoll.like*10000)
            $scope.percentage= present/100;
              $timeout(()=>{
              if (+imageRoll.like*100 > +chanceOfLike){
                LsystemFactory.drawResult();
              } else if(+imageRoll.like*100 < +chanceOfLike){                 
                  resetItAll(); 
                  counter+=1;
                $scope.message=`Im trying to find your image, this is search ${counter}`
              }
          },100);   
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
 
        $scope.reset= ()=>{
          let zoomAmt= 0;
          $scope.zoomAmt = 0;
          LsystemFactory.resetImage();    
          LsystemFactory.zoomImage(zoomAmt);
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