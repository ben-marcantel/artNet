"use strict";

const passport = require("passport");


const displayTrainSession = (req, res, next) => {
    let {TrainingSet} = req.app.get('models');    
    let user_id = req.user.id;    
    TrainingSet.findAll({raw: true, where: {user_id}})
    .then(trainSet => {
        res.status(200).json(trainSet);
    }).catch(err=>{
        console.log('ERROR:',err);  
        next(err);      
    })
};

const createTrainSession = (req, res, next)=>{
    let {TrainingSet} = req.app.get('models');
    let user = req.user.id;
    let {...newTrainSession}= req.body;
    
if (user){
    newTrainSession.user_id = user;   
    TrainingSet.create(newTrainSession)
    .then((data)=>{
        res.status(200).end();
    })
    .catch(err=>{
        console.log('ERROR:',err);
        next(err);
    })
} else {
    res.render('login');
    }
}

const deleteTrainSession = (req,res,next)=>{
    let { TrainingSet } = req.app.get('models');
    let id = req.params.id;
    TrainingSet.destroy({where: {id:id}})
    .then(() => {
        res.status(201).end();
    })
    .catch(err=>{
        console.log('ERROR:',err);
        next(err);
    });
}


module.exports = {displayTrainSession, createTrainSession, deleteTrainSession };
