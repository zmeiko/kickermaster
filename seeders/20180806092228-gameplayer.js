"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "GamePlayers",
      [
        {
          userId: 1,
          gameId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          team: 0,
          position: 1
        },
        {
          userId: 1,
          gameId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          team: 0,
          position: 0
        },
        {
          userId: 2,
          gameId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          team: 1,
          position: 0
        },
        {
          userId: 3,
          gameId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          team: 0,
          position: 1
        },
        {
          userId: 4,
          gameId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          team: 1,
          position: 1
        },
        {
          userId: 5,
          gameId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          team: 1,
          position: 1
        },
        {
          userId: 3,
          gameId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          team: 0,
          position: 0
        },
        {
          userId: 5,
          gameId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          team: 1,
          position: 1
        },
        {
          userId: 2,
          gameId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          team: 1,
          position: 0
        },
        {
          userId: 3,
          gameId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          team: 0,
          position: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GamePlayers", null, {});
  }
};
