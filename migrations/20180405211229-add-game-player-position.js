"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("GamePlayers", "position", {
      type: Sequelize.INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Users", "position");
  }
};
