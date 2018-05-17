'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {timestamps: false, tableName: "users"});
  User.associate = function(models) {
    User.hasMany(models.TrainingSet, {
      foreignKey: 'user_id' 
    });
  };
  return User;
};