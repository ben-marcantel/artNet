"use strict";

const passport = require("passport");



const getDataSet = (req, res, next) => {
    let {DataSet} = req.app.get('models');    
    let id = req.params.id;   
    DataSet.findAll({raw: true, where: {id}})
    .then(dataSet => {
        res.status(200).json(dataSet.results);
    }).catch(err=>{
        console.log('ERROR:',err);  
        next(err);      
    })
};


const createDataSet = (req, res, next)=>{
    let {DataSet} = req.app.get('models');
    let user = req.app.get("user");
    let id = req.params.id;   
    
    let {...newDataSet}= req.body;
if (user){
    newDataSet.data_set_id = id;
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