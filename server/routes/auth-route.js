"use strict";

const{Router}= require("express");
const router = Router();

const{register, login, logout}= require("../controllers/authCtrl.js");

router.post("/register", register);
router.post("/login",login);
router.post("/logout", logout);

router.get("/status",(req,res)=>{
    console.log("user in status get", req.user);
    if(!req.isAuthenticated()){
       console.log("not authenticated in get status route");
       return res.status(200).send(null);
    }
    res.status(200).json({username: req.user.username, id:req.user.id})
});

module.exports = router;