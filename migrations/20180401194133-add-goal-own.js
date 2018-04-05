"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("Goals", "ownGoal", { type: Sequelize.BOOLEAN });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Games", "ownGoal");
  }
};
