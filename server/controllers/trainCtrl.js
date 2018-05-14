"use strict";

const passport = require("passport");


const displayTrainSession = (req, res, next) => {
    let {TrainingSet} = req.app.get('models');    
    let userId = req.user.id;    
    TrainingSet.findAll({raw: true, where: {userId}})
    .then(trainSet => {
        res.status(200).json(trainSet.results);
    }).catch(err=>{
        console.log('ERROR:',err);  
        next(err);      
    })
};

const createTrainSession = (req, res, next)=>{
    console.log("oh hai mark")
    let {TrainSession} = req.app.get('models');
    let user = req.app.get("user");
    let {newTrainSession}= req.body;
// if (user){
//     newTrainSession.userId = user.id;
//     TrainingSet.create({newTrainSession})
//     .then((data)=>{
//         res.status(201).end();
//     })
//     .catch(err=>{
//         console.log('ERROR:',err);
//         next(err);
//     })
// } else {
//     res.render('login');
//     }
}

const deleteTrainSession = (req,res,next)=>{
    let { TrainingSet } = req.app.get('models');
    let { id } = req.params;
    TrainingSet.destroy({where: {id}})
    .then(() => {
        res.status(201).end();
    })
    .catch(err=>{
        console.log('ERROR:',err);
        next(err);
    });
}


module.exports = {displayTrainSession, createTrainSession, deleteTrainSession };
