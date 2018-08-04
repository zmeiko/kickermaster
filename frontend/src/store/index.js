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
      loadGames: flow(function*() {
        const { games } = yield api.get("/api/games");
        self.games = games;
      }),
      loadStats: flow(function*() {
        const { usersStats } = yield api.get("/api/stats");
        self.usersStats = usersStats;
      })
    };
  })
  .views(self => {
    return {
      getUserById(id) {
        //let user = {};
        //self.users.filter(user => user.id === id).map(data => user = data);
        //console.log((user))
        return self.users.filter(user => user.id === id);
      },
      get isEmpty() {
        return !!self.users.length;
      }
    };
  });

export const store = Store.create({});
