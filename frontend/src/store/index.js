import { types, flow } from "mobx-state-tree";
import api from "../api";
import { TEAM_RED, TEAM_BLUE, POSITION_FORWARD } from "../constants";

const GamePlayer = types.model({
  team: types.number,
  position: types.maybe(types.number)
});

const Goal = types.model({
  id: types.maybe(types.number),
  ownGoal: types.boolean,
  createdAt: types.string,
  UserId: types.number
});

const MAX_GAME_GOALS = 10;
const FRW_GOALS_KOEF = 2;
const DEF_SAVES_KOEF = 2;
const WIN_BONUS_X = 1.5;

const User = types
  .model({
    id: types.number,
    name: types.string,
    photoUrl: types.maybe(types.string),
    GamePlayer: types.maybe(GamePlayer),
    Goals: types.optional(types.array(Goal), []),
    games: types.late(() =>
      types.optional(types.array(types.reference(Game)), [])
    )
  })
  .views(self => ({
    get goals() {
      return self.Goals.filter(goal => !goal.ownGoal);
    },
    get ownGoals() {
      return self.Goals.filter(goal => goal.ownGoal);
    },
    get goalsPerMatch() {
      return self.goals.length / self.games.length;
    },
    get ratingGames() {
      return self.games.filter(game => game.isValid);
    },
    get myAverageGameRating() {
      return (
        self.ratingGames.reduce((result, game) => {
          result += self.myGameRating(game);
          return result;
        }, 0) / self.ratingGames.length
      );
    },
    myGamePlayer(game) {
      return game.Users.find(user => user.id === self.id).GamePlayer;
    },
    myGameRating(game) {
      const myGamePlayer = self.myGamePlayer(game);
      const myTeam = myGamePlayer.team;
      const myPosition = myGamePlayer.position;
      const myGoals =
        myTeam === TEAM_BLUE
          ? game.blueGoals.filter(goal => goal.UserId === self.id).length
          : game.redGoals.filter(goal => goal.UserId === self.id).length;

      const allMissedGoals =
        myTeam === TEAM_BLUE ? game.redScore : game.blueScore;

      let rating;
      if (myPosition === POSITION_FORWARD) {
        rating = myGoals * FRW_GOALS_KOEF + (MAX_GAME_GOALS - allMissedGoals);
      } else {
        rating = (MAX_GAME_GOALS - allMissedGoals) * DEF_SAVES_KOEF + myGoals;
      }

      return rating * (game.winnerTeam === myTeam ? WIN_BONUS_X : 1);
    },
    get gamesCount() {
      return self.ratingGames.length;
    },
    get winsCount() {
      return self.ratingGames.filter(game => {
        const myGamePlayer = self.myGamePlayer(game);
        return myGamePlayer.team === game.winnerTeam;
      }).length;
    },
    get loosesCount() {
      return self.ratingGames.filter(game => {
        const myGamePlayer = self.myGamePlayer(game);
        return myGamePlayer.team !== game.winnerTeam;
      }).length;
    }
  }));

const Game = types
  .model({
    id: types.identifier(types.number),
    createdAt: types.string,
    Users: types.optional(types.array(User), []),
    Goals: types.optional(types.array(Goal), [])
  })
  .views(self => ({
    get redUsers() {
      return self.Users.filter(user => user.GamePlayer.team === TEAM_RED);
    },
    get redUserIds() {
      return self.redUsers.map(user => user.id);
    },
    get blueUsers() {
      return self.Users.filter(user => user.GamePlayer.team === TEAM_BLUE);
    },
    get blueUserIds() {
      return self.blueUsers.map(user => user.id);
    },
    get redGoals() {
      return self.Goals.filter(
        goal => self.redUserIds.includes(goal.UserId) && !goal.ownGoal
      );
    },
    get redOwnGoals() {
      return self.Goals.filter(
        goal => self.redUserIds.includes(goal.UserId) && goal.ownGoal
      );
    },
    get blueGoals() {
      return self.Goals.filter(
        goal => self.blueUserIds.includes(goal.UserId) && !goal.ownGoal
      );
    },
    get blueOwnGoals() {
      return self.Goals.filter(
        goal => self.blueUserIds.includes(goal.UserId) && goal.ownGoal
      );
    },
    get redScore() {
      return self.redGoals.length + self.blueOwnGoals.length;
    },
    get blueScore() {
      return self.blueGoals.length + self.redOwnGoals.length;
    },
    get completed() {
      return (
        self.redScore === MAX_GAME_GOALS || self.blueScore === MAX_GAME_GOALS
      );
    },
    get score() {
      return `${self.redScore}:${self.blueScore}`;
    },
    get winnerTeam() {
      return self.blueScore > self.redScore ? TEAM_BLUE : TEAM_RED;
    },
    get winnerPlayers() {
      return self.winnerTeam === TEAM_BLUE ? self.blueUsers : self.redUsers;
    },
    get isValid() {
      return (
        self.completed &&
        self.Users.length === 4 &&
        self.Users.every(
          user =>
            user.GamePlayer.team !== null && user.GamePlayer.position !== null
        )
      );
    }
  }))
  .actions(self => ({
    addGoal(UserId) {
      self.Goals.push({
        UserId,
        ownGoal: false,
        createdAt: new Date().toString()
      });
    },
    addOwnGoal(UserId) {
      self.Goals.push({
        UserId,
        ownGoal: true,
        createdAt: new Date().toString()
      });
    }
  }));

const Store = types
  .model({
    users: types.optional(types.array(User), []),
    games: types.optional(types.array(Game), [])
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
      })
    };
  });

const GameStore = types
  .model({
    game: types.maybe(Game)
  })
  .actions(self => {
    return {
      init: flow(function*(gameId) {
        const { game } = yield api.get(`/api/game/${gameId}`);
        self.game = game;
      }),
      addGoal: flow(function*(userId) {
        self.game.addGoal(userId);
        yield api.post(`/api/game/goal`, {
          gameId: self.game.id,
          userId
        });
      }),
      addOwnGoal: flow(function*(userId) {
        self.game.addOwnGoal(userId);
        yield api.post(`/api/game/goal`, {
          gameId: self.game.id,
          userId,
          ownGoal: true
        });
      }),
      removeLastGoal: flow(function*() {
        const [lastGoal] = self.game.Goals.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        yield api.delete(`/api/game/goal`, {
          goalId: lastGoal.id
        });
        self.game.Goals.remove(lastGoal);
      })
    };
  });

export const gameStore = GameStore.create({});
export const store = Store.create({});
