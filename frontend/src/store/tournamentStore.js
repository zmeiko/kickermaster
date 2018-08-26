import { types, flow } from "mobx-state-tree";
import api from "../api";
import Tournament from "./tournament";

const TournamentStore = types
  .model({
    tournaments: types.optional(types.array(Tournament), [])
  })
  .actions(self => {
    let index = 0; //temporary solution
    return {
      addTournament(tournament) {
        self.tournaments.push({
          id: index++,
          title: tournament.title,
          date: new Date().toDateString(),
          author: tournament.author,
          status: "active"
        });
      },
      getTournaments: flow(function*() {
        const { tournaments } = yield api.get("/api/tournaments");
        self.tournaments = tournaments;
      })
      /*addTournament: flow(function*({ title }) {
        const { tournament } = yield api.post("/api/tournaments", { title });
        self.tournaments.unshift(tournament);
      })*/
    };
  })
  .views(self => {
    return {
      getTournamentById(id) {
        return self.tournaments.find(tournament => tournament.id === id);
      }
    };
  });

export const tournamentStore = TournamentStore.create({});
