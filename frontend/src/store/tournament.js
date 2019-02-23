import { types, flow } from "mobx-state-tree";
import api from "../api";
import Team from "./team";
import Game from "./game";

const TournamentGame = types.model({
  team1: Team,
  team2: Team
});

const Tournament = types
  .model({
    id: types.maybe(types.number),
    title: types.string,
    status: types.maybe(types.string),
    createdAt: types.string,
    TournamentGames: types.optional(types.array(TournamentGame), []),
    stats: types.optional(
      types.array(
        types.model({
          games: types.number,
          wins: types.number,
          defeats: types.number,
          goalsScored: types.number,
          goalsMissed: types.number,
          team: Team
        })
      ),
      []
    ),
    gamesResults: types.optional(
      types.array(
        types.model({
          team1: Team,
          team2: Team,
          game: types.maybe(Game),
          teamRed: types.maybe(Team),
          teamBlue: types.maybe(Team)
        })
      ),
      []
    )
  })
  .actions(self => ({
    loadStats: flow(function*() {
      const { stats } = yield api.get(`/api/tournaments/${self.id}/stats`);
      self.stats = stats;
    }),
    loadGamesResults: flow(function*() {
      const { gamesResults } = yield api.get(
        `/api/tournaments/${self.id}/games-results`
      );
      self.gamesResults = gamesResults;
    })
  }));

export default Tournament;
