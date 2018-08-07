import { types } from "mobx-state-tree";

const UserStats = types
  .model({
    id: types.number,
    name: types.string,
    photoUrl: types.maybe(types.string),
    wins: types.number,
    defeats: types.number,
    goals: types.number,
    games: types.number,
    rating: types.maybe(types.number)
  })
  .views(self => ({
    get winsPercent() {
      if (self.games > 0) {
        return Math.round(self.wins / self.games * 100);
      }
      return 0;
    },
    get defeatsPercent() {
      if (self.games > 0) {
        return Math.round(self.defeats / self.games * 100);
      }
      return 0;
    },
    get goalsPerMatch() {
      if (self.games > 0) {
        return self.goals / self.games;
      }
      return 0;
    }
  }));

export default UserStats;
