import { types, flow } from "mobx-state-tree";
import api from "../api";
import User from "./user";
import UserStats from "./userStats";
import Game from "./game";

const Store = types
  .model({
    users: types.optional(types.array(User), []),
    games: types.optional(types.array(Game), []),
    usersStats: types.optional(types.array(UserStats), []),
    startOfWeekForFilter: types.optional(types.Date, new Date())
  })
  .actions(self => {
    return {
      setStartOfWeek(date) {
        self.startOfWeekForFilter = date;
      },
      loadUsers: flow(function*() {
        const { users } = yield api.get("/api/users");
        self.users = users;
      }),
      loadGames: flow(function*() {
        const { games } = yield api.get(
          `/api/games/${self.startOfWeekForFilter}`
        );
        self.games = games;
      }),
      loadStats: flow(function*() {
        const { usersStats } = yield api.get(
          `/api/stats/${self.startOfWeekForFilter}`
        );
        self.usersStats = usersStats;
      })
    };
  });

export const store = Store.create({});
