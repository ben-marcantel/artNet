"use strict";

angular.module("ArtNet").factory("DataFactory", $http => {
    return {
      searchAPIMovies(keyword) {
        return $http.get(`/movies?keyword=${keyword}`);
      },
  
      postToData(data) {
        console.log("to database", data);
        return $http.post(`/data`, data);
      }
    };
  });