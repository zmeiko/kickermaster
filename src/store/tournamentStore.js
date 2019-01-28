import { types, flow } from "mobx-state-tree";
import api from "../api";
import Tournament from "./tournament";

const TournamentStore = types
  .model({
    tournaments: types.optional(types.array(Tournament), [])
  })
  .actions(self => {
    return {
      getTournaments: flow(function*() {
        const { tournaments } = yield api.get("/api/tournaments");
        self.tournaments = tournaments;
      }),
      addTournament: flow(function*({ title }) {
        const { tournament } = yield api.post("/api/tournaments", { title });
        self.tournaments.unshift(tournament);
      })
    };
  });

export const store = TournamentStore.create({});
