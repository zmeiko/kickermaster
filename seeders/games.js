"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Games",
      [
        {
          ball: null,
          updatedAt: new Date(),
          createdAt: new Date(),
          status: "STARTED"
        },
        {
          ball: null,
          updatedAt: new Date(),
          createdAt: new Date(),
          status: "FINISHED"
        },
        {
          ball: null,
          updatedAt: new Date(),
          createdAt: new Date(),
          status: "STARTED"
        },
        {
          ball: null,
          updatedAt: new Date(),
          createdAt: new Date(),
          status: "FINISHED"
        },
        {
          ball: null,
          updatedAt: new Date(),
          createdAt: new Date(),
          status: "STARTED"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Games", null, {});
  }
};
