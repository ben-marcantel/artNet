'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DataSets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      axiomValue: {
        type: Sequelize.DECIMAL
      },
      productionOneValue: {
        type: Sequelize.DECIMAL
      },
      productionTwoValue: {
        type: Sequelize.DECIMAL
      },
      leftValue: {
        type: Sequelize.DECIMAL
      },
      rightValue: {
        type: Sequelize.DECIMAL
      },
      iterationValue: {
        type: Sequelize.DECIMAL
      },
      dividendValue: {
        type: Sequelize.DECIMAL
      },
      moveXValue: {
        type: Sequelize.DECIMAL
      },
      moveYValue: {
        type: Sequelize.DECIMAL
      },
      drawLogicValue: {
        type: Sequelize.DECIMAL
      },
      setSaveLogicValue: {
        type: Sequelize.DECIMAL
      },
      setRestoreLogicValue: {
        type: Sequelize.DECIMAL
      },
      like: {
        type: Sequelize.INTEGER
      },
      dislike: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DataSets');
  }
};