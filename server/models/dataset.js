'use strict';
module.exports = (sequelize, DataTypes) => {
  var DataSet = sequelize.define('DataSet', {
    axiomValue: DataTypes.DECIMAL,
    productionOneValue: DataTypes.DECIMAL,
    productionTwoValue: DataTypes.DECIMAL,
    leftValue: DataTypes.DECIMAL,
    rightValue: DataTypes.DECIMAL,
    iterationValue: DataTypes.DECIMAL,
    dividendValue: DataTypes.DECIMAL,
    moveXValue: DataTypes.DECIMAL,
    moveYValue: DataTypes.DECIMAL,
    drawLogicValue: DataTypes.DECIMAL,
    setSaveLogicValue: DataTypes.DECIMAL,
    setRestoreLogicValue: DataTypes.DECIMAL,
    like: DataTypes.INTEGER,
    dislike: DataTypes.INTEGER
  }, {timestamps: false, tableName: "data"});
  DataSet.associate = function(models) {
    DataSet.belongsTo(models.TrainingSet, {
      foreignKey: 'data_set_id' 
    });
  };
  return DataSet;
};