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
    gamesWeekFilter: types.optional(types.string, new Date().toString()),
    loggedInUser: types.maybe(User)
  })
  .actions(self => {
    return {
      loadUsers: flow(function*() {
        const { users } = yield api.get("/api/users");
        self.users = users;
      }),
      loadGames: flow(function*(date) {
        const { games } = yield api.get(`/api/games?date=${date}`);
        self.games = games;
      }),
      loadStats: flow(function*(date = "") {
        const { usersStats } = yield api.get(`/api/stats?date=${date}`);
        self.usersStats = usersStats;
      }),
      applyGamesWeekFilter(payload) {
        self.gamesWeekFilter = payload;
      },
      loadLoggedInUser: flow(function*() {
        const { data } = yield api.get("/api/me");
        self.loggedInUser = data;
      })
    };
  })
  .views(self => {
    return {
      getUserById(id) {
        return self.users.find(user => user.id === id);
      }
    };
  });

export const store = Store.create({});
