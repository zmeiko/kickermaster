"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Goals",
      [
        {
          userId: 1,
          gameId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownGoal: 0
        },
        {
          userId: 2,
          gameId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownGoal: 1
        },
        {
          userId: 3,
          gameId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownGoal: 1
        },
        {
          userId: 4,
          gameId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownGoal: 1
        },
        {
          userId: 5,
          gameId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownGoal: 1
        },
        {
          userId: 3,
          gameId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownGoal: 1
        },
        {
          userId: 1,
          gameId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownGoal: 0
        },
        {
          userId: 5,
          gameId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownGoal: 1
        },
        {
          userId: 2,
          gameId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownGoal: 0
        },
        {
          userId: 3,
          gameId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          ownGoal: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Goals", null, {});
  }
};
