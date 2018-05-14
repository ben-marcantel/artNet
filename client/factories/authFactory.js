"use strict";

angular.module("ArtNet").factory("AuthFactory",($q, $http, $rootScope)=>{
    let currentUser = null;


    return {
        createUser(userObj) {
            return $q((resolve, reject) => {
              $http.post("/register", userObj)
              .then(userData => {
                currentUser = userData;
                resolve(userData.data);
              }).catch(err => {
                reject(err);
              });
            });
          },
          logOutUser(userObj){
            return $q((resolve, reject)=>{
                $http.post("/logout", userObj)
                .then(user=>{
                    currentUser = user.data;
                    resolve(user.data);
                })
                .catch(err=>{
                    reject(err);
                });
            });
        },

        logInUser(userObj){
            return $q((resolve, reject)=>{
                $http.post("/login", userObj)
                .then(user=>{
                    currentUser = user.data;
                    resolve(user.data);
                })
                .catch(err=>{
                    reject(err);
                });
            });
        },

        getCurrentUser(){
            return currentUser;
        },

        setUserStatus(){
            return $http.get("/status")
            .then(user=>{
                if (user){
                    currentUser  = user.data;
                } else {
                   currentUser = null;
                }
            })
            .catch(()=>{
                currentUser = null;
            });
        },
        broadcastUserLogin(user){
            $rootScope.$broadcast("handle Broadcast",user);
        }
    };
});