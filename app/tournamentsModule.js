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
    include: [{ model: db.User }],
    order: [["createdAt", "DESC"]]
  });
  return tournaments;
}

async function getTournament(tournamentId) {
  const tournament = await db.Tournament.findById(tournamentId, {
    include: [{ model: db.User }]
  });
  return tournament;
}

async function createTeam() {}
async function updateTeam() {}
async function deleteTeam() {}

async function addTeamToTournament() {}

module.exports = {
  createTournament,
  getTournaments,
  getTournament
};
