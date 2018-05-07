'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {tableName: "users"});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};