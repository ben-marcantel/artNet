'use strict';

let models = require("./server/models");

models.sequelize.sync({force: true})
  .then( () => {
    return models.DataSet.create();
  }).then( () => {
    return models.TrainingSet.create();
  }).then( () => {
    return models.User.create();
  })
  .then( () => {
    process.exit();
  });