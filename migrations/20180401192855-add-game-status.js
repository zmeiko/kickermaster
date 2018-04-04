'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Games', 'status', { type: Sequelize.STRING })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Games', 'status')
  }
};
