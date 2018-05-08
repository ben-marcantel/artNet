'use strict';

let models = require("./server/models");

models.sequelize.sync({force: true})
  .then( () => {
    return models.User.create();
  })
  .then( () => {
    process.exit();
  });