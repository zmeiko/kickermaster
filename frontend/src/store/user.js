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
    stats: types.maybe(UserStats)
  })
  .actions(self => {
    return {
      loadStats: flow(function*() {
        const { usersStats } = yield api.get(`/api/stats?userId=${self.id}`);
        self.stats = usersStats[0];
      })
    };
  });

export default User;
