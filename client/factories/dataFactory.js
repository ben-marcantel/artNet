"use strict";

angular.module("ArtNet").factory("DataFactory", $http => {
    
  
     const postToData =(data)=> {
        console.log("to database", data);
        return $http.post(`/data`, data);
      };
  



  });