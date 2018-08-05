import { types, flow } from "mobx-state-tree";
import api from "../api";
import User from "./user";
import UserStats from "./userStats";
import Game from "./game";

const Store = types
  .model({
    users: types.optional(types.array(User), []),
    games: types.optional(types.array(Game), []),
    usersStats: types.optional(types.array(UserStats), [])
  })
  .actions(self => {
    return {
      loadUsers: flow(function*() {
        const { users } = yield api.get("/api/users");
        self.users = users;
      }),
      loadGames: flow(function*(date) {
        const { games } = yield api.get(
          `/api/games?currentDate=${date || new Date()}`
        );
        self.games = games;
      }),
      loadStats: flow(function*(date) {
        const { usersStats } = yield api.get(
          `/api/stats?currentDate=${date || new Date()}`
        );
        self.usersStats = usersStats;
      })
    };
  });

export const store = Store.create({});
