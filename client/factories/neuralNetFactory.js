"use strict";


angular.module("ArtNet").factory("NeuralNetFactory", function($q,$http,$window, $document, $timeout,$route, $interval) {
    let lineArray =[];
    let userId;
    let brain;
    
            
    const getTrainData =()=>{
        return $q((resolve, reject) => {
            $http
                .get("/data")
                .then((data) => {
                    // outputObject = {
                    //     like:1
                    // }
                    // trainObject = {input:inputObject, output: outputObject};
                    // let keys = Object.keys(params.data);
                    // keys.forEach(key => {
                    //     params.data[key].paramsId = key;
                    // });
                    let paramsDataArr = Object.values(data.data);
                    resolve(paramsDataArr);
                    console.log("form from database",data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
   
    const getTrainSessions =()=>{
        return $q((resolve, reject) => {
            $http
                .get("/training")
                .then((data) => {
                    // outputObject = {
                    //     like:1
                    // }
                    // trainObject = {input:inputObject, output: outputObject};
                    // let keys = Object.keys(params.data);
                    // keys.forEach(key => {
                    //     params.data[key].paramsId = key;
                    // });
                    let trainDataArr = Object.values(data.data);
                    resolve(trainDataArr);
                    console.log("form from database",data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const createTrainSession =(name)=>{
        console.log(name);
        return $q((resolve, reject) => {
            $http.post("/training", name)
            .then(data => {
                console.log("new train", data);
              resolve(data.data);
            }).catch(err => {
              reject(err);
            });
        });
    };

    const deleteTrainSession =()=>{

    };



    const sendLikeData =(trainObject)=>{
        trainObject.like = 1;
        trainObject.dislike = 0;
        return $q((resolve, reject) => {
            $http.post("/data", trainObject)
            .then(data => {
              resolve(data.data);
            }).catch(err => {
              reject(err);
            });
        });
    };
    
    const sendDislikeData =(trainObject)=>{
        trainObject.like = 0;
        trainObject.dislike = 1;
        return $q((resolve, reject) => {
            $http.post("/data", trainObject)
            .then(data => {
              resolve(data.data);
            }).catch(err => {
              reject(err);
            });
        });
    };

    // const network = new brain.NeuralNetwork({
    //     activation: 'sigmoid', // activation function
    //     hiddenLayers: [7],
    //     learningRate: 0.3 
    // });

    // const divinationRod = ()=>{
    //       network.train(lineArray);
    // };

return{sendLikeData, sendDislikeData, createTrainSession, getTrainSessions, deleteTrainSession};

});