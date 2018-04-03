import { types, flow } from 'mobx-state-tree';
import api from '../api';

const GamePlayer = types.model({
  team: types.number
})

const Goal = types.model({
  ownGoal: types.boolean,
  UserId: types.number
})

const User = types.model({
  id: types.number,
  name: types.string,
  photoUrl: types.string,
  GamePlayer: types.maybe(GamePlayer),
  Goals: types.optional(types.array(Goal), [])
})

const TEAM_RED = 0;
const TEAM_BLUE = 1;

const Game = types.model({
  id: types.number,
  createdAt: types.string,
  Users: types.optional(types.array(User), []),
  Goals: types.optional(types.array(Goal), [])
}).views(self => ({
  get redUsers() {
    return self.Users.filter(user => user.GamePlayer.team === TEAM_RED)
  },
  get redUserIds() {
    return self.redUsers.map(user => user.id)
  },
  get blueUsers() {
    return self.Users.filter(user => user.GamePlayer.team === TEAM_BLUE)
  },
  get blueUserIds() {
    return self.blueUsers.map(user => user.id)
  },
  get redGoals() {
    return self.Goals.filter(goal => self.redUserIds.includes(goal.UserId) && !goal.ownGoal);
  },
  get redOwnGoals() {
    return self.Goals.filter(goal => self.redUserIds.includes(goal.UserId) && goal.ownGoal);
  },
  get blueGoals() {
    return self.Goals.filter(goal => self.blueUserIds.includes(goal.UserId) && !goal.ownGoal);
  },
  get blueOwnGoals() {
    return self.Goals.filter(goal => self.blueUserIds.includes(goal.UserId) && goal.ownGoal);
  },
  get score() {
    return `${self.redGoals.length + self.blueOwnGoals.length}:${self.blueGoals.length + self.redOwnGoals.length}`
  }
})).actions(self => ({
  addGoal(UserId) {
    self.Goals.push({ UserId, ownGoal: false });
  },
  addOwnGoal(UserId) {
    self.Goals.push({ UserId, ownGoal: true });
  }
}));

const Store = types.model({
  users: types.optional(types.array(User), []),
  games: types.optional(types.array(Game), []),
}).actions(self => {
  return {
    loadUsers: flow(function* () {
      const { users } = yield api.get('/api/users');
      self.users = users;
    }),
    loadGames: flow(function* () {
      const { games } = yield api.get('/api/games');
      self.games = games;
    })
  }
})

const GameStore = types.model({
  game: types.maybe(Game)
}).actions(self => {
  return {
    init: flow(function* (gameId) {
      const { game } = yield api.get(`/api/game/${gameId}`);
      self.game = game;
    }),
    addGoal: flow(function* (userId) {
      self.game.addGoal(userId);
      yield api.post(`/api/game/goal`, {
        gameId: self.game.id,
        userId
      });
    }),
    addOwnGoal: flow(function* (userId) {
      self.game.addOwnGoal(userId);
      yield api.post(`/api/game/goal`, {
        gameId: self.game.id,
        userId,
        ownGoal: true
      });
    }),
  }
})

export const gameStore = GameStore.create({})
export const store = Store.create({})
