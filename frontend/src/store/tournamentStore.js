import { types } from "mobx-state-tree";
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
      }
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
