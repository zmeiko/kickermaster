const moment = require("moment");
const db = require("../models");

const GOALS_TO_FINISH_GAME = 10;
const POSITION_FORWARD = 0;
const POSITION_DEFENDER = 1;

const FRW_GOALS_KOEF = 2;
const DEF_SAVES_KOEF = 2;
const WIN_BONUS_KOEF = 1.5;

async function getUsersStats(date) {
  const gamesQuery = `
    SELECT
      Games.id AS 'gameId',
      SUM(
        CASE
          WHEN GamePlayers.team = 0 AND Goals.ownGoal = 0 THEN 1
          WHEN GamePlayers.team = 1 AND Goals.ownGoal = 1 THEN 1
          ELSE 0
        END
      ) AS 'goalsTeam0',
      SUM(
        CASE
          WHEN GamePlayers.team = 1 AND Goals.ownGoal = 0 THEN 1
          WHEN GamePlayers.team = 0 AND Goals.ownGoal = 1 THEN 1
          ELSE 0
        END
      ) AS 'goalsTeam1'
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
      Games.createdAt AS 'gameDate',
      GamePlayers.team AS 'team',
      GamePlayers.position AS 'position',
      SUM(
        CASE
          WHEN Goals.ownGoal = 0
          THEN 1
          ELSE 0
        END
      ) AS 'goals',
      CASE
        WHEN GamePlayers.team = 0
        THEN GameScores.goalsTeam0
        ELSE GameScores.goalsTeam1
      END as 'ourGoals',
      CASE
        WHEN GamePlayers.team = 0
        THEN GameScores.goalsTeam1
        ELSE GameScores.goalsTeam0
      END as 'theirGoals',
      CASE
        WHEN GamePlayers.team = 0 AND GameScores.goalsTeam0 > GameScores.goalsTeam1 THEN 1
        WHEN GamePlayers.team = 1 AND GameScores.goalsTeam1 > GameScores.goalsTeam0 THEN 1
        ELSE 0
      END AS 'win',
      CASE
        WHEN GamePlayers.team = 0 AND GameScores.goalsTeam0 < GameScores.goalsTeam1 THEN 1
        WHEN GamePlayers.team = 1 AND GameScores.goalsTeam1 < GameScores.goalsTeam0 THEN 1
        ELSE 0
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
    GROUP BY
      Users.id,
      Games.id,
      Games.createdAt,
      GamePlayers.team,
      GamePlayers.position
    HAVING GamePlayers.position IS NOT NULL
      AND (ourGoals = ${GOALS_TO_FINISH_GAME} OR theirGoals = ${GOALS_TO_FINISH_GAME})
  `;

  const startOfWeek =
    date !== "undefined"
      ? moment(date)
          .startOf("week")
          .format("MM/DD/YYYY")
      : moment(new Date(0)).format("MM/DD/YYYY");
  const endOfWeek =
    date !== "undefined"
      ? moment(date)
          .endOf("week")
          .format("MM/DD/YYYY")
      : moment(new Date())
          .endOf("week")
          .format("MM/DD/YYYY");

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
      END AS 'defeats',
      CAST(
        AVG(
          (
            CASE
              WHEN UserGames.position = ${POSITION_FORWARD}
              THEN UserGames.goals * ${FRW_GOALS_KOEF} + (${GOALS_TO_FINISH_GAME} - UserGames.theirGoals)
              ELSE (${GOALS_TO_FINISH_GAME} - UserGames.theirGoals) * ${DEF_SAVES_KOEF} + UserGames.goals
            END
          )
          *
          (
            CASE
              WHEN UserGames.win = 1
              THEN ${WIN_BONUS_KOEF}
              ELSE 1
            END
          )
        ) AS UNSIGNED
      ) AS 'rating'
    FROM Users
      LEFT JOIN (${usersGamesQuery}) AS UserGames
        ON Users.id = UserGames.userId
    WHERE
      UserGames.gameDate > STR_TO_DATE('${startOfWeek}', '%m/%d/%Y')
        AND UserGames.gameDate <= STR_TO_DATE('${endOfWeek}', '%m/%d/%Y')
    GROUP BY Users.id
  `;

  return db.sequelize.query(usersStatsQuery, { model: db.UserStats });
}

module.exports = {
  getUsersStats
};
