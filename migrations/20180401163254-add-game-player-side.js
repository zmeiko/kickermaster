"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("GamePlayers", "team", {
      type: Sequelize.INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Users", "team");
  }
};
