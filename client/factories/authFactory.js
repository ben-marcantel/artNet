"use strict";

angular.module("ArtNet").factory("AuthFactory",($q, $http, $rootScope)=>{
    let currentUser = null;


    return {
        createUser(userObj) {
            console.log("so far so good",userObj);
            return $q((resolve, reject) => {
              $http.post("/register", userObj)
              .then(userData => {
                console.log("new user added", userData);
                currentUser = userData;
                resolve(userData.data);
              }).catch(err => {
                reject(err);
              });
            });
          },


        logInUser(userObj){
            console.log("userObj", userObj);


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
                console.log("user in set user status", user);
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
            console.log("calling broadcast", user);
            $rootScope.$broadcast("handle Broadcast",user);
        }
    };
});