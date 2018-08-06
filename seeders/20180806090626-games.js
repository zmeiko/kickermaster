"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Games",
      [
        {
          ball: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: "FINISHED"
        },
        {
          ball: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: "STARTED"
        },
        {
          ball: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: "FINISHED"
        },
        {
          ball: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: "STARTED"
        },
        {
          ball: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: "FINISHED"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Games", null, {});
  }
};
