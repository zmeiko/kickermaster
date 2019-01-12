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
    include: [{ model: db.User }, { model: db.Team }],
    order: [["createdAt", "DESC"]]
  });
  return tournaments;
}

async function getTournament(tournamentId) {
  const tournament = await db.Tournament.findById(tournamentId, {
    include: [{ model: db.User }, { model: db.Team }]
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

module.exports = {
  createTournament,
  getTournaments,
  getTournament,
  linkTeam,
  unlinkTeam
};
