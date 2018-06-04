const db = require("../models");

const GOALS_TO_FINISH_GAME = 10;

async function getUsersStats() {
  const gamesQuery = `
    SELECT
      Games.id AS 'gameId',
      SUM(CASE WHEN GamePlayers.team = 0 THEN 1 ELSE 0 END) AS 'firstTeamGoals',
      SUM(CASE WHEN GamePlayers.team = 1 THEN 1 ELSE 0 END) AS 'secondTeamGoals'
    FROM Games
      LEFT JOIN Goals
        ON Games.id = Goals.gameId
      LEFT JOIN GamePlayers
        ON Goals.gameId = GamePlayers.gameId
          AND Goals.userId = GamePlayers.userId
    GROUP BY Games.id
  `;

  const usersGamesQuery = `
    SELECT
      Users.id AS 'userId',
      Games.id AS 'gameId',
      GamePlayers.team AS 'team',
      GamePlayers.position AS 'position',
      COUNT(Goals.id) AS 'goals',
      CASE
        WHEN GamePlayers.team = 0
        THEN GameScores.firstTeamGoals
        ELSE GameScores.secondTeamGoals
      END as 'ourGoals',
      CASE
        WHEN GamePlayers.team = 0
        THEN GameScores.secondTeamGoals
        ELSE GameScores.firstTeamGoals
      END as 'theirGoals',
      CASE
        WHEN GamePlayers.team = 0 AND GameScores.firstTeamGoals > GameScores.secondTeamGoals
        THEN 1
        ELSE 0
      END AS 'win',
      CASE
        WHEN GamePlayers.team = 0 AND GameScores.firstTeamGoals > GameScores.secondTeamGoals
        THEN 0
        ELSE 1
      END AS 'defeat'
    FROM Users
      LEFT JOIN GamePlayers
        ON Users.id = GamePlayers.userId
      LEFT JOIN Games
        ON GamePlayers.gameId = Games.id
      LEFT JOIN Goals
        ON Games.id = Goals.gameId
          AND Goals.userId = Users.id
      LEFT JOIN (${gamesQuery}) AS GameScores
        ON Games.id = GameScores.gameId
    GROUP BY Users.id
    HAVING GamePlayers.position IS NOT NULL
      AND (ourGoals = ${GOALS_TO_FINISH_GAME} OR theirGoals = ${GOALS_TO_FINISH_GAME})
  `;

  const usersStatsQuery = `
    SELECT
      Users.id,
      Users.name,
      Users.photoUrl,
      COUNT(UserGames.userId) AS 'games',
      CASE
        WHEN SUM(UserGames.goals) IS NULL
        THEN 0
        ELSE CAST(SUM(UserGames.goals) AS UNSIGNED)
      END AS 'goals',
      CASE
        WHEN SUM(UserGames.win) IS NULL
        THEN 0
        ELSE CAST(SUM(UserGames.win) AS UNSIGNED)
      END AS 'wins',
      CASE
        WHEN SUM(UserGames.defeat) IS NULL
        THEN 0
        ELSE CAST(SUM(UserGames.defeat) AS UNSIGNED)
      END AS 'defeats'
    FROM Users
      LEFT JOIN (${usersGamesQuery}) AS UserGames
        ON Users.id = UserGames.userId
    GROUP BY Users.id
  `;

  return db.sequelize.query(usersStatsQuery, { model: db.UserStats });
}

module.exports = {
  getUsersStats
};
