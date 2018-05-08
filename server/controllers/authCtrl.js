"use strict";

const passport = require("passport");


module.exports.register = (req, res, next)=>{
    console.log("its here",req);
    passport.authenticate("local-signup", (err, user, msgObj)=>{
        if (err){
            return next(err);
        }
        if (!user){
            console.log("Error registering", msgObj.message);
            res.status(409);
            res.json({message: msgObj.message});
        }
        req.logIn(user,err =>{
            if(err){
                return next(err);
            }
            console.log("authenticated!", user);
            let currentUser = {username: user.name, id: user.id};
            res.status(200).json(currentUser);
        });

    })(req,res,next);
};

module.exports.login=(req, res, next) =>{
    passport.authenticate("local-signin", (err,user, msgObj)=>{
        console.log("error message?", msgObj);

        if(err){
            return next(err);
        }
        if(!user){
            console.log("Error logging in !", msgObj.message);
            res.status(401);
            res.json({message: msgObj.message});
        }
        req.logIn(user, err=>{
            if(err){
                return next(err);
            }
            console.log("authenticated", user);
            res.status(200).json({username: user.name, id: user.id});
        });
    })(req,res, next);
};

module.exports.logout = (req,res,next)=>{
    req.session.destroy(function(err){
        if(err) return next(err);
        res.status(200).end();
    })
}
