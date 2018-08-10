import { types, flow } from "mobx-state-tree";
import api from "../api";
import GamePlayer from "./gamePlayer";
import UserStats from "./userStats";

const User = types
  .model({
    id: types.number,
    name: types.string,
    photoUrl: types.maybe(types.string),
    GamePlayer: types.maybe(GamePlayer),
    stats: types.optional(types.array(UserStats), [])
  })
  .actions(self => {
    return {
      loadStats: flow(function*(userId) {
        const { usersStats } = yield api.get(`/api/stats?userId=${userId}`);
        self.stats = usersStats;
      })
    };
  })
  .views(self => {
    return {
      getUserStats() {
        return self.stats[0];
      }
    };
  });

export default User;
