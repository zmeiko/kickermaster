import { types, flow } from "mobx-state-tree";
import api from "../api";
import User from "./user";
import UserStats from "./userStats";
import Game from "./game";
import moment from "moment";

const Store = types
  .model({
    users: types.optional(types.array(User), []),
    games: types.optional(types.array(Game), []),
    usersStats: types.optional(types.array(UserStats), []),
    startOfWeek: types.optional(types.Date, moment().toDate()),
    isRefresh: types.optional(types.boolean, true)
  })
  .actions(self => {
    return {
      setStartOfWeek(date) {
        self.startOfWeek = date;
        self.isRefresh = false;
      },
      loadUsers: flow(function*() {
        const { users } = yield api.get("/api/users");
        self.users = users;
      }),
      loadGames: flow(function*() {
        console.log(self.startOfWeek);
        const { games } = yield api.post("/api/games", {
          startOfWeek: self.startOfWeek
        });
        self.games = games;
        self.isRefresh = true;
      }),
      loadStats: flow(function*() {
        const { usersStats } = yield api.post("/api/stats", {
          startOfWeek: self.startOfWeek
        });
        self.usersStats = usersStats;
        self.isRefresh = true;
      })
    };
  });

export const store = Store.create({});
