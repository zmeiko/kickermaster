import { types } from "mobx-state-tree";
import Tournament from "./tournament";

const TournamentStore = types
  .model({
    tournaments: types.optional(types.array(Tournament), [])
  })
  .actions(self => {
    return {
      addTournament(title) {
        self.tournaments.push({
          title: title,
          date: new Date().toDateString(),
          author: "Aleksey Kuznetsov",
          status: "active"
        });
      }
    };
  });

export const store = TournamentStore.create({});
