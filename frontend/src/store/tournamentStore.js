import { types } from "mobx-state-tree";
import Tournament from "./tournament";

const TournamentStore = types
  .model({
    tournaments: types.optional(types.array(Tournament), [])
  })
  .actions(self => {
    return {
      addTournament(tour) {
        self.tournaments.push(tour);
        console.log(self.tournaments);
      }
    };
  });

export const store = TournamentStore.create({});
