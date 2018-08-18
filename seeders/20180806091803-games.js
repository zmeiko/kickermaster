"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Games", [
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
    ]);
    let usersId = await queryInterface.sequelize.query(
      "SELECT users.id FROM users",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    let gamesId = await queryInterface.sequelize.query(
      "SELECT games.id FROM games",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (usersId !== undefined && gamesId !== undefined) {
      return Promise.all([
        await queryInterface.bulkInsert("Goals", [
          {
            userId: usersId[0].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[0].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[0].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[0].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[0].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[0].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[0].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[0].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[0].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[0].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[1].id,
            gameId: gamesId[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[3].id,
            gameId: gamesId[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[4].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[0].id,
            gameId: gamesId[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 0
          },
          {
            userId: usersId[4].id,
            gameId: gamesId[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[4].id,
            gameId: gamesId[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[4].id,
            gameId: gamesId[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[4].id,
            gameId: gamesId[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[4].id,
            gameId: gamesId[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[4].id,
            gameId: gamesId[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[4].id,
            gameId: gamesId[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[4].id,
            gameId: gamesId[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[4].id,
            gameId: gamesId[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          },
          {
            userId: usersId[1].id,
            gameId: gamesId[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 0
          },
          {
            userId: usersId[1].id,
            gameId: gamesId[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 0
          },
          {
            userId: usersId[1].id,
            gameId: gamesId[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 0
          },
          {
            userId: usersId[1].id,
            gameId: gamesId[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 0
          },
          {
            userId: usersId[1].id,
            gameId: gamesId[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 0
          },
          {
            userId: usersId[1].id,
            gameId: gamesId[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 0
          },
          {
            userId: usersId[1].id,
            gameId: gamesId[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 0
          },
          {
            userId: usersId[1].id,
            gameId: gamesId[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 0
          },
          {
            userId: usersId[1].id,
            gameId: gamesId[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 0
          },
          {
            userId: usersId[2].id,
            gameId: gamesId[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ownGoal: 1
          }
        ]),
        await queryInterface.bulkInsert(
          "GamePlayers",
          [
            {
              userId: usersId[0].id,
              gameId: gamesId[0].id,
              createdAt: new Date(),
              updatedAt: new Date(),
              team: 0,
              position: 1
            },
            {
              userId: usersId[0].id,
              gameId: gamesId[3].id,
              createdAt: new Date(),
              updatedAt: new Date(),
              team: 0,
              position: 0
            },
            {
              userId: usersId[1].id,
              gameId: gamesId[0].id,
              createdAt: new Date(),
              updatedAt: new Date(),
              team: 1,
              position: 0
            },
            {
              userId: usersId[2].id,
              gameId: gamesId[1].id,
              createdAt: new Date(),
              updatedAt: new Date(),
              team: 0,
              position: 1
            },
            {
              userId: usersId[3].id,
              gameId: gamesId[1].id,
              createdAt: new Date(),
              updatedAt: new Date(),
              team: 1,
              position: 1
            },
            {
              userId: usersId[4].id,
              gameId: gamesId[2].id,
              createdAt: new Date(),
              updatedAt: new Date(),
              team: 1,
              position: 1
            },
            {
              userId: usersId[2].id,
              gameId: gamesId[2].id,
              createdAt: new Date(),
              updatedAt: new Date(),
              team: 0,
              position: 0
            },
            {
              userId: usersId[4].id,
              gameId: gamesId[3].id,
              createdAt: new Date(),
              updatedAt: new Date(),
              team: 1,
              position: 1
            },
            {
              userId: usersId[1].id,
              gameId: gamesId[4].id,
              createdAt: new Date(),
              updatedAt: new Date(),
              team: 1,
              position: 0
            },
            {
              userId: usersId[2].id,
              gameId: gamesId[4].id,
              createdAt: new Date(),
              updatedAt: new Date(),
              team: 0,
              position: 1
            }
          ],
          {}
        )
      ]);
    }
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete("Goals", null, {}),
      queryInterface.bulkDelete("GamePlayers", null, {}),
      queryInterface.bulkDelete("Games", null, {})
    ]);
  }
};
