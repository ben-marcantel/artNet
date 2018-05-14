'use strict';
module.exports = (sequelize, DataTypes) => {
  var TrainingSet = sequelize.define('TrainingSet', {
    name: DataTypes.STRING
  }, {timestamps: false, tableName: "training_set"});
  TrainingSet.associate = function(models) {
    TrainingSet.belongsTo(models.User, {
      foreignKey: 'user_id' 
    });
    TrainingSet.hasMany(models.DataSet, {
      foreignKey: 'data_set_Id' 
    });
  };
  return TrainingSet;
};