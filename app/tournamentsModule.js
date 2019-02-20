const moment = require("moment");
const db = require("../models");

async function createTournament(params) {
  const { id } = await db.Tournament.create(params);
  const tournament = await db.Tournament.findById(id, {
    include: [{ model: db.User }]
  });
  return tournament;
}

async function updateTournament() {}
async function deleteTournament() {}

async function getTournaments() {
  const tournaments = await db.Tournament.findAll({
    include: [
      {
        model: db.TournamentGame,
        include: [
          {
            model: db.Team,
            as: "team1",
            include: [
              { model: db.User, as: "player1" },
              { model: db.User, as: "player2" }
            ]
          },
          {
            model: db.Team,
            as: "team2",
            include: [
              { model: db.User, as: "player1" },
              { model: db.User, as: "player2" }
            ]
          }
        ]
      }
    ],
    order: [["createdAt", "DESC"]]
  });
  return tournaments;
}

async function getTournament(tournamentId) {
  const tournament = await db.Tournament.findById(tournamentId, {
    include: [
      { model: db.Team },
      {
        model: db.TournamentGame,
        include: [
          {
            model: db.Game,
            include: [{ model: db.User }, { model: db.Goal }]
          },
          {
            model: db.Team,
            as: "team1",
            include: [
              { model: db.User, as: "player1" },
              { model: db.User, as: "player2" }
            ]
          },
          {
            model: db.Team,
            as: "team2",
            include: [
              { model: db.User, as: "player1" },
              { model: db.User, as: "player2" }
            ]
          }
        ]
      }
    ]
  });
  return tournament;
}

async function linkTeam({ tournamentId, teamId }) {
  const tournament = await db.Tournament.findById(tournamentId);
  const team = await db.Team.findById(teamId);
  if (tournament && team) {
    await tournament.addTeam(team);
  }
}

async function unlinkTeam({ tournamentId, teamId }) {
  const tournament = await db.Tournament.findById(tournamentId);
  const team = await db.Team.findById(teamId);
  if (tournament && team) {
    await tournament.removeTeam(team);
  }
}

async function createTournamentGames(tournamentId) {
  const tournament = await db.Tournament.findById(tournamentId, {
    include: [{ model: db.Team }]
  });

  const tournamentGames = [];
  const teams = tournament.Teams.slice();
  while (teams.length > 0) {
    const team1 = teams.pop();
    teams.forEach(team2 => {
      tournamentGames.push({
        team1Id: team1.id,
        team2Id: team2.id,
        tournamentId
      });
    });
  }

  await db.TournamentGame.bulkCreate(tournamentGames);
}

async function linkGame({ tournamentGameId, gameId }) {
  const tournamentGame = await db.TournamentGame.findById(tournamentGameId);
  const game = await db.Game.findById(gameId);

  if (tournamentGame && game) {
    tournamentGame.addGame(game);
  }
}

async function unlinkGame({ tournamentGameId, gameId }) {
  const tournamentGame = await db.TournamentGame.findById(tournamentGameId);
  const game = await db.Game.findById(gameId);

  if (tournamentGame && game) {
    tournamentGame.removeGame(game);
  }
}

module.exports = {
  createTournament,
  getTournaments,
  getTournament,
  linkTeam,
  unlinkTeam,
  createTournamentGames,
  linkGame,
  unlinkGame
};
