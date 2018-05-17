"use strict";

const passport = require("passport");



const getDataSet = (req, res, next) => {
    let {DataSet} = req.app.get('models');  
    let id = req.params.id;
    DataSet.findAll({raw: true, where: {data_set_id:id}})
    .then(dataSet => {
        res.status(200).json(dataSet);
    }).catch(err=>{
        console.log('ERROR:',err);  
        next(err);      
    })
};

const createDataSet = (req, res, next)=>{
    let {DataSet} = req.app.get('models');
    let {...newDataSet}= req.body.inputObject;
    let user = req.user.id; 
    console.log(newDataSet);
    if (user){
        DataSet.create(newDataSet)
        .then((data)=>{
            res.status(201).end();
        })
        .catch(err=>{
            console.log('ERROR:',err);
            next(err);
        })
        } else {
            res.render('login');
        }
}




module.exports = {getDataSet, createDataSet};