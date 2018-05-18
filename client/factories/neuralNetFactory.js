"use strict";


angular.module("ArtNet").factory("NeuralNetFactory", function($q,$http,$window, $document, $timeout,$route, $interval) {
    
    let sessionId;
    let network;
    let trainDataArray=[];
    let trainedSetDataArray=[];
    let likeTallyArray=[];
    let dislikeTallyArray=[];
    // let brain;
    

    const setTrainSetId = (id)=>{
        sessionId = id;
    };

    const resetTrainSessionsArray = ()=>{
        trainedSetDataArray.length = 0;
    };

    const getTrainData =()=>{
        return $q((resolve, reject) => {
            $http
                .get(`/data/${sessionId}`)
                .then((data) => {
                    trainedSetDataArray = Object.values(data.data);
                    resolve(trainedSetDataArray);
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
                    let trainDataArr = Object.values(data.data);
                    resolve(trainDataArr);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const createTrainSession =(name)=>{
        return $q((resolve, reject) => {
            $http.post("/training", JSON.stringify({name:name}))
            .then(data => {
              resolve(data.data);
            }).catch(err => {
              reject(err);
            });
        });
    };

    const deleteTrainSession =(trainSessionId)=>{
        return $q((resolve, reject) => {
            $http.post(`/training/delete/${trainSessionId}`)
            .then(data => {
              resolve(data.data);
            }).catch(err => {
              reject(err);
            });
        });
    };

    const sendLikeData =(trainObject,currentSessionId)=>{
        trainObject.inputObject.like = 1;
        trainObject.inputObject.dislike = 0;
        trainObject.inputObject.data_set_id = currentSessionId;        
        return $q((resolve, reject) => {
            $http.post("/data", trainObject)
            .then(data => {
              resolve(data.data);
            }).catch(err => {
              reject(err);
            });
        });
    };
    
    const sendDislikeData =(trainObject,currentSessionId)=>{
        trainObject.inputObject.like = 0;
        trainObject.inputObject.dislike = 1;
        trainObject.inputObject.data_set_id = currentSessionId;
        return $q((resolve, reject) => {
            $http.post("/data", trainObject)
            .then(data => {
              resolve(data.data);
            }).catch(err => {
              reject(err);
            });
        });
    };

////////TO RESULTS CONTROLLER    
    
    const formatData = (sets)=>{
        let input = {};
        let output = {};
        let trainObject = {};
        
        sets.forEach(set=>{
            output.like = set.like;
            output.dislike = set.dislike;
            delete set.like;
            delete set.dislike;
            delete set.data_set_id;
            delete set.data_set_Id;
            delete set.id;
            
            input = set;
            trainObject.input = input;
            trainObject.output = output;
            
            trainDataArray.push(trainObject);

        });
    };

    const oracle = ()=>{
        network = new brain.NeuralNetwork({
            activation: 'sigmoid', // activation function
            hiddenLayers: [7],
            learningRate: 0.3 
        });
    };
   
    const fate =(data)=>{
        let roll = data.inputObject;
        let result = network.run(roll);
        return result;
    };

    const divinationRod = ()=>{
        return $q((resolve, reject) => {
            oracle();
            return getTrainData()
            .then((data)=>{            
                formatData(data);
                network.train(trainDataArray);
            })
            .then(()=>{
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

    const resetTally = ()=>{
        likeTallyArray.length = 0; 
        dislikeTallyArray.length = 0;   
    };

    const votes = (id)=>{
        resetTally();
        let result ={};
        getTrainData(id)
        .then(data=>{
            data.forEach(element => { 
                if(element.like === 1){
                    likeTallyArray.push(element);
                    result.yes = likeTallyArray.length;  
                    result.no = dislikeTallyArray.length;   
                    
                } else if (element.dislike === 1){
                    dislikeTallyArray.push(element);
                    result.yes = likeTallyArray.length;                      
                    result.no = dislikeTallyArray.length;   
                }
            });
        });
        return result ;
    };

    const getArrayLength = ()=>{
        return trainDataArray.length;
    };    

    const resetArrayLength = ()=>{
         trainDataArray.length = 0;
    };

        return {sendLikeData, sendDislikeData, createTrainSession, getTrainSessions, deleteTrainSession, setTrainSetId, getTrainData, divinationRod, fate, getArrayLength,resetArrayLength, votes};

});